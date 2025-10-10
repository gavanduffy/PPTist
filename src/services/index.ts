import axios from './config'

const DEFAULT_SERVER_URL = '/api'
export const SERVER_URL = import.meta.env.VITE_AI_SERVER_URL || DEFAULT_SERVER_URL

interface AIPPTOutlinePayload {
  content: string
  language: string
  model: string
}

interface AIPPTPayload {
  content: string
  language: string
  style: string
  model: string
}

interface AIWritingPayload {
  content: string
  command: string
}

interface MCPImagePayload {
  topic: string
  outline?: string
  count?: number
}

export default {
  getMockData(filename: string): Promise<any> {
    return axios.get(`./mocks/${filename}.json`)
  },

  AIPPT_Outline({
    content,
    language,
    model,
  }: AIPPTOutlinePayload): Promise<any> {
    return fetch(`${SERVER_URL}/tools/aippt_outline`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        language,
        model,
        stream: true,
      }),
    })
  },

  AIPPT({
    content,
    language,
    style,
    model,
  }: AIPPTPayload): Promise<any> {
    return fetch(`${SERVER_URL}/tools/aippt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        language,
        model,
        style,
        stream: true,
      }),
    })
  },

  AI_Writing({
    content,
    command,
  }: AIWritingPayload): Promise<any> {
    return fetch(`${SERVER_URL}/tools/ai_writing`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        command,
        stream: true,
      }),
    })
  },

  MCP_SearchImages({
    topic,
    outline,
    count,
  }: MCPImagePayload): Promise<any> {
    return fetch(`${SERVER_URL}/tools/mcp/images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic,
        outline,
        count,
      }),
    }).then(response => {
      if (!response.ok) throw new Error('Failed to query MCP tool')
      return response
    })
  },
}