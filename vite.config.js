import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import http from 'http'
import { extractBrandAssets } from 'openbrand'

const BRAND_PORT = 3001

function reply(res, body) {
  const json = JSON.stringify(body)
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Length': Buffer.byteLength(json),
  })
  res.end(json)
}

function brandApiPlugin() {
  let brandServer = null
  return {
    name: 'brand-api',
    configureServer() {
      brandServer = http.createServer(async (req, res) => {
        const { pathname, searchParams } = new URL(req.url, `http://localhost:${BRAND_PORT}`)
        if (pathname !== '/api/brand') return reply(res, { ok: false, error: 'Not found' })

        const url = searchParams.get('url')
        if (!url) return reply(res, { ok: false, error: 'Missing url param' })

        try {
          const result = await extractBrandAssets(url)
          reply(res, result.ok
            ? { ok: true, data: result.data }
            : { ok: false, error: result.error?.message ?? 'Extraction failed' }
          )
        } catch (e) {
          reply(res, { ok: false, error: e.message })
        }
      })

      brandServer.listen(BRAND_PORT, () => {
        console.log(`  ➜  Brand API: http://localhost:${BRAND_PORT}/api/brand`)
      })
    },
    closeBundle() {
      brandServer?.close()
    },
  }
}

export default defineConfig({
  plugins: [react(), brandApiPlugin()],
  server: {
    proxy: {
      '/api/brand': `http://localhost:${BRAND_PORT}`,
    },
  },
})
