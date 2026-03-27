// Small API server for brand extraction (runs alongside Vite dev server)
import express from 'express'
import { extractBrandAssets } from 'openbrand'

const app = express()

app.get('/api/brand', async (req, res) => {
  const url = req.query.url
  if (!url) return res.status(400).json({ error: 'Missing url param' })

  try {
    const result = await extractBrandAssets(url)
    if (result.ok) {
      res.json(result.data)
    } else {
      res.status(502).json({ error: result.error?.message || 'Extraction failed' })
    }
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

const PORT = 3001
app.listen(PORT, () => console.log(`Brand API running on http://localhost:${PORT}`))

// sharp drains the event loop after processing — keep process alive
setInterval(() => {}, 1 << 30)
