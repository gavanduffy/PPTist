import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import compression from 'compression'
import serveStatic from 'serve-static'
import dotenv from 'dotenv'

import {
  requestOutline,
  requestSlides,
  requestWriting,
  callMcpTool,
  streamFromString,
  streamSlides,
} from './lib/ai.mjs'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '../dist')

const app = express()
app.use(express.json({ limit: '2mb' }))
app.use(compression())

const handleError = (res, error) => {
  console.error(error)
  res.status(500).json({ message: error.message || 'Unexpected server error' })
}

app.post('/api/tools/aippt_outline', async (req, res) => {
  try {
    const { content, language, model } = req.body || {}
    if (!content) {
      return res.status(400).json({ message: 'Missing content for outline generation' })
    }

    const outline = await requestOutline({ topic: content, language, model })
    streamFromString(res, outline)
  }
  catch (error) {
    handleError(res, error)
  }
})

app.post('/api/tools/aippt', async (req, res) => {
  try {
    const { content, language, model } = req.body || {}
    if (!content) {
      return res.status(400).json({ message: 'Missing outline content' })
    }

    const slides = await requestSlides({ outline: content, language, model })
    streamSlides(res, slides)
  }
  catch (error) {
    handleError(res, error)
  }
})

app.post('/api/tools/ai_writing', async (req, res) => {
  try {
    const { content, command, model } = req.body || {}
    if (!content || !command) {
      return res.status(400).json({ message: 'Missing content or command' })
    }

    const result = await requestWriting({ content, command, model })
    streamFromString(res, result)
  }
  catch (error) {
    handleError(res, error)
  }
})

app.post('/api/tools/mcp/images', async (req, res) => {
  try {
    const { topic, outline, count } = req.body || {}
    if (!topic && !outline) {
      return res.status(400).json({ message: 'A topic or outline is required for MCP search' })
    }

    const images = await callMcpTool({ topic, outline, count })
    res.json({ images })
  }
  catch (error) {
    handleError(res, error)
  }
})

if (process.env.NODE_ENV === 'production') {
  app.use(serveStatic(distDir, { extensions: ['html'] }))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(distDir, 'index.html'))
  })
}

const port = Number(process.env.PORT || 5000)
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
