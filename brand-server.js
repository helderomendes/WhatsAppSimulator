// Brand extraction API — pure Node.js http + openbrand
import http from 'http'
import { extractBrandAssets } from 'openbrand'

function reply(res, body) {
  const json = JSON.stringify(body)
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(json),
    'Access-Control-Allow-Origin': '*',
  })
  res.end(json)
}

const server = http.createServer(async (req, res) => {
  const { pathname, searchParams } = new URL(req.url, 'http://localhost')
  if (pathname !== '/api/brand') {
    return reply(res, { ok: false, error: 'Not found' })
  }

  const url = searchParams.get('url')
  if (!url) return reply(res, { ok: false, error: 'Missing url param' })

  console.log('[brand] fetching:', url)
  try {
    const result = await extractBrandAssets(url)
    if (result.ok) {
      console.log('[brand] ok — name:', result.data.brand_name)
      reply(res, { ok: true, data: result.data })
    } else {
      console.log('[brand] failed:', result.error?.code, result.error?.message)
      reply(res, { ok: false, error: result.error?.message ?? 'Extraction failed' })
    }
  } catch (e) {
    console.error('[brand] threw:', e.message)
    reply(res, { ok: false, error: e.message })
  }
})

process.on('uncaughtException', err => console.error('[brand] uncaught:', err.message))
process.on('unhandledRejection', err => console.error('[brand] rejection:', err))

server.listen(3001, () => console.log('Brand API running on http://localhost:3001'))
setInterval(() => {}, 1 << 30)
