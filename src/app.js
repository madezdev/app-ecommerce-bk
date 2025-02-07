import express, { json } from 'express'
import { productRouter } from './routes/product.js'

const PORT = process.env.PORT ?? 8080
const app = express()

app.use(json())
app.disable('x-powered-by')

app.use('/api/products', productRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
