import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { extractBrandAssets } from 'openbrand'

function brandApiPlugin() {
  return {
    name: 'brand-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api/brand')) return next()

        const url = new URL(req.url, 'http://localhost').searchParams.get('url')
        if (!url) {
          res.writeHead(200, { 'Content-Type': 'application/json' })
          return res.end(JSON.stringify({ ok: false, error: 'Missing url param' }))
        }

        try {
          const result = await extractBrandAssets(url)
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(
            result.ok
              ? { ok: true, data: result.data }
              : { ok: false, error: result.error?.message ?? 'Extraction failed' }
          ))
        } catch (e) {
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ ok: false, error: e.message }))
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), brandApiPlugin()],
})
