import { Readable } from 'node:stream'
import fetch from 'node-fetch'

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'
const DEFAULT_MODEL = process.env.OPENROUTER_DEFAULT_MODEL || 'gpt-4o-mini'

const requiredHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  }

  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY is not set')
  }

  headers.Authorization = `Bearer ${process.env.OPENROUTER_API_KEY}`
  headers['HTTP-Referer'] = process.env.OPENROUTER_REFERRER || 'http://localhost'
  headers['X-Title'] = process.env.OPENROUTER_SITE_NAME || 'PPTist'
  return headers
}

const cleanJson = (value) => {
  if (!value) return ''
  return value
    .replace(/^```json/, '')
    .replace(/^```/, '')
    .replace(/```$/g, '')
    .replace(/```/g, '')
    .trim()
}

const callOpenRouter = async ({ model, messages, responseFormat }) => {
  const body = {
    model: model || DEFAULT_MODEL,
    messages,
  }

  if (responseFormat) body.response_format = responseFormat

  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: requiredHeaders(),
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`OpenRouter request failed: ${response.status} ${detail}`)
  }

  const payload = await response.json()
  const content = payload.choices?.[0]?.message?.content

  if (!content) throw new Error('Empty response from OpenRouter')

  return content
}

export const streamFromString = (res, content) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  Readable.from([content]).pipe(res)
}

export const streamSlides = (res, slides) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  const chunks = slides.map(slide => JSON.stringify(slide))
  Readable.from(chunks).pipe(res)
}

export const createOutlinePrompt = ({ topic, language }) => {
  const languageLabel = language || 'English'
  return [
    {
      role: 'system',
      content: 'You are an expert presentation designer who writes precise, well structured outlines.',
    },
    {
      role: 'user',
      content: `Create a slide-by-slide outline for a presentation about "${topic}".\n- Respond entirely in ${languageLabel}.\n- Use Markdown with numbered sections for slides.\n- Include bullet points for each slide.\n- Do not invent slides beyond what is requested.\n- Return only the outline with no commentary.`,
    },
  ]
}

export const createSlidesPrompt = ({ outline, language }) => {
  const languageLabel = language || 'English'
  return [
    {
      role: 'system',
      content: 'You turn detailed slide outlines into structured JSON slide descriptions.',
    },
    {
      role: 'user',
      content: `Convert the outline below into JSON describing each slide exactly as written.\n- Maintain the order and number of slides from the outline.\n- Never merge, drop, or add slides.\n- Use ${languageLabel} for any generated text.\n- Follow this schema: an array where each item has a "type" field (cover | contents | transition | content | end).\n  * cover: {"type":"cover","data":{"title":string,"text":string}}\n  * contents: {"type":"contents","data":{"items":string[]}}\n  * transition: {"type":"transition","data":{"title":string,"text":string}}\n  * content: {"type":"content","data":{"title":string,"items":[{"title":string,"text":string}]}}\n  * end: {"type":"end"}\n- Every content slide item must keep both title and text if present in the outline.\n- Use empty strings when information is missing.\n- Respond with JSON only.\n\nOutline:\n${outline}`,
    },
  ]
}

export const createWritingPrompt = ({ content, command }) => ([
  {
    role: 'system',
    content: 'You assist with concise presentation copy writing.',
  },
  {
    role: 'user',
    content: `${command}: ${content}`,
  },
])

export const requestOutline = async ({ topic, language, model }) => {
  const messages = createOutlinePrompt({ topic, language })
  return callOpenRouter({ model, messages })
}

export const requestSlides = async ({ outline, language, model }) => {
  const messages = createSlidesPrompt({ outline, language })
  const responseFormat = {
    type: 'json_schema',
    json_schema: {
      name: 'slides',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            type: { type: 'string' },
            data: { type: 'object' },
            offset: { type: ['integer', 'null'] },
          },
          required: ['type', 'data'],
        },
      },
    },
  }
  const content = await callOpenRouter({ model, messages, responseFormat })
  const cleaned = cleanJson(content)
  const slides = JSON.parse(cleaned)
  if (!Array.isArray(slides)) throw new Error('Slides response is not an array')
  return slides
}

export const requestWriting = async ({ content, command, model }) => {
  const messages = createWritingPrompt({ content, command })
  return callOpenRouter({ model, messages })
}

export const callMcpTool = async ({ topic, outline, count }) => {
  const endpoint = process.env.MCP_WIKIPEDIA_TOOL_URL
  if (!endpoint) {
    throw new Error('MCP_WIKIPEDIA_TOOL_URL is not configured')
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ topic, outline, count }),
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`MCP tool error: ${response.status} ${detail}`)
  }

  const data = await response.json()
  if (!Array.isArray(data.images)) {
    throw new Error('MCP tool response must include an images array')
  }

  return data.images.map((item, index) => ({
    id: item.id || `${index}`,
    src: item.url || item.src,
    width: item.width || 1920,
    height: item.height || 1080,
  })).filter(img => img.src)
}
