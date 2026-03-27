// Small API server for brand extraction (runs alongside Vite dev server)
import express from 'express'
import { extractBrandAssets } from 'openbrand'

const app = express()

function send(res, status, body) {
  const json = JSON.stringify(body)
  res.writeHead(status, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(json) })
  res.end(json)
}

app.get('/api/brand', async (req, res) => {
  const url = req.query.url
  if (!url) return send(res, 400, { error: 'Missing url param' })

  try {
    const result = await extractBrandAssets(url)
    if (result.ok) {
      send(res, 200, result.data)
    } else {
      send(res, 502, { error: result.error?.message ?? String(result.error) })
    }
  } catch (e) {
    send(res, 500, { error: e?.message ?? String(e) })
  }
})

process.on('uncaughtException', err => console.error('[brand-server] uncaught:', err.message))
process.on('unhandledRejection', err => console.error('[brand-server] unhandled rejection:', err))

const PORT = 3001
app.listen(PORT, () => console.log(`Brand API running on http://localhost:${PORT}`))

// sharp drains the event loop after processing — keep process alive
setInterval(() => {}, 1 << 30)
