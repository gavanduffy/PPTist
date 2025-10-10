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
      content: 'You are an expert presentation designer and educator who creates precise, well-structured lesson outlines with clear learning objectives and pedagogical flow.',
    },
    {
      role: 'user',
      content: `Create a comprehensive slide-by-slide outline for an educational presentation or lesson about "${topic}".
- Respond entirely in ${languageLabel}.
- Structure the lesson with a clear beginning (introduction/objectives), middle (key concepts/content), and end (summary/conclusion).
- Start with a cover slide, include a contents/agenda slide, use transition slides between major sections, and end with a conclusion slide.
- Use Markdown with numbered sections for slides.
- For each content slide, include bullet points that represent key learning points, examples, or discussion topics.
- Ensure slides build on each other logically and create a coherent learning experience.
- Include 8-12 slides total for a complete lesson structure.
- Do not add commentary, just return the outline.`,
    },
  ]
}

export const createSlidesPrompt = ({ outline, language }) => {
  const languageLabel = language || 'English'
  return [
    {
      role: 'system',
      content: 'You are an expert at converting educational presentation outlines into structured, pedagogically sound JSON slide descriptions that create effective learning experiences.',
    },
    {
      role: 'user',
      content: `Convert the outline below into JSON describing each slide exactly as written.
- Maintain the order and number of slides from the outline.
- Never merge, drop, or add slides.
- Use ${languageLabel} for any generated text.
- Follow this schema: an array where each item has a "type" field (cover | contents | transition | content | end).
  * cover: {"type":"cover","data":{"title":string,"text":string}} - The opening slide with presentation title and optional subtitle
  * contents: {"type":"contents","data":{"items":string[]}} - Table of contents listing major sections
  * transition: {"type":"transition","data":{"title":string,"text":string}} - Section divider with section name and brief description
  * content: {"type":"content","data":{"title":string,"items":[{"title":string,"text":string}]}} - Content slide with main topic and key points (each point has a title and explanation)
  * end: {"type":"end"} - Closing slide
- For content slides, ensure each item has both a concise title (key concept) and explanatory text (details, examples, or context).
- Use empty strings when information is missing.
- Respond with JSON only.

Outline:
${outline}`,
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
