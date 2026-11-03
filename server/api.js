// Mini Cart API: a tiny Express server. Vite forwards every /api request here (see vite.config.js).
import express from 'express'
import { readFileSync } from 'node:fs'

const { categories, items } = JSON.parse(readFileSync(new URL('./data.json', import.meta.url), 'utf8'))

const app = express()
app.use(express.json())

app.get('/api/categories', (req, res) => {
  res.json(categories)
})

app.get('/api/items', (req, res) => {
  const { category } = req.query
  res.json(category ? items.filter((item) => item.category === category) : items)
})

// TODO 8: Add Reset and Checkout buttons (POST /api/checkout)
// Read req.body.cart, add up price × quantity, and send back { receiptId, cart, total }.
app.post('/api/checkout', (req, res) => {
  res.status(501).json({ error: 'Checkout is not built yet' })
})

app.listen(3001, () => {
  console.log('Mini Cart API running on http://localhost:3001')
})
