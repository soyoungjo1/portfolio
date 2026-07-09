import Anthropic from '@anthropic-ai/sdk'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { message } = body as { message: string }

  if (!message?.trim()) {
    throw createError({ statusCode: 400, message: 'message is required' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.NUXT_ANTHROPIC_API_KEY
  if (!apiKey) {
    throw createError({ statusCode: 500, message: 'ANTHROPIC_API_KEY env var is not set' })
  }

  const systemPrompt = await useStorage('assets:server').getItem<string>('chat-context.md')
  if (!systemPrompt) {
    throw createError({ statusCode: 500, message: 'chat-context.md not found' })
  }

  // SSE headers
  setResponseHeaders(event, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  })

  const client = new Anthropic({ apiKey })

  const stream = client.messages.stream({
    model: 'claude-haiku-4-5',
    max_tokens: 4096,
    system: systemPrompt,
    messages: [{ role: 'user', content: message }],
  })

  const res = event.node.res

  for await (const chunk of stream) {
    if (
      chunk.type === 'content_block_delta' &&
      chunk.delta.type === 'text_delta'
    ) {
      const data = JSON.stringify({ text: chunk.delta.text })
      res.write(`data: ${data}\n\n`)
    }
  }

  res.write('data: [DONE]\n\n')
  res.end()
})
