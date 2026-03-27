import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function brandApiPlugin() {
  return {
    name: 'brand-api',
    configureServer(server) {
      server.middlewares.use('/api/brand', async (req, res) => {
        const urlParam = new URL(req.url, 'http://localhost').searchParams.get('url')
        if (!urlParam) {
          res.writeHead(400, { 'Content-Type': 'application/json' })
          return res.end(JSON.stringify({ error: 'Missing url param' }))
        }
        try {
          const { extractBrandAssets } = await import('openbrand')
          const result = await extractBrandAssets(urlParam)
          res.writeHead(result.ok ? 200 : 502, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(result.ok ? result.data : { error: result.error.message }))
        } catch (e) {
          res.writeHead(500, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: e.message }))
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), brandApiPlugin()],
})
