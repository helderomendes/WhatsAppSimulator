// Brand extraction API — pure Node.js http (no Express)
import http from 'http'
import { extractBrandAssets } from 'openbrand'

function reply(res, status, body) {
  const json = JSON.stringify(body)
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(json),
    'Access-Control-Allow-Origin': '*',
  })
  res.end(json)
}

const server = http.createServer(async (req, res) => {
  const { pathname, searchParams } = new URL(req.url, 'http://localhost')

  if (pathname !== '/api/brand') {
    return reply(res, 404, { error: 'Not found' })
  }

  const url = searchParams.get('url')
  if (!url) return reply(res, 400, { error: 'Missing url param' })

  console.log('[brand] fetching:', url)
  try {
    const result = await extractBrandAssets(url)
    console.log('[brand] ok:', result.ok, result.ok ? '' : result.error?.code)
    if (result.ok) {
      reply(res, 200, result.data)
    } else {
      reply(res, 502, { error: result.error?.message ?? 'Extraction failed' })
    }
  } catch (e) {
    console.error('[brand] threw:', e.message)
    reply(res, 500, { error: e.message })
  }
})

process.on('uncaughtException', err => console.error('[brand] uncaught:', err.message))
process.on('unhandledRejection', err => console.error('[brand] rejection:', err))

server.listen(3001, () => console.log('Brand API running on http://localhost:3001'))
