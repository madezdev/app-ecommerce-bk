import { randomUUID } from 'crypto'
import { readJSON, writeJSON } from '../../utils/utils'

const cartsFile = './src/data/carts.json'
const productsFile = './src/data/products.json'

export class CartModel {
  static async getCartById (id) {
    const carts = await readJSON(cartsFile)
    const cartById = carts.find((c) => c.id === id)
    if (!cartById) return { error: 'Cart not found', data: null }
    return { message: 'Cart found', data: cartById }
  }

  static async createCart () {
    const carts = await readJSON(cartsFile)
    const dateCreated = new Date().toISOString()
    const newCart = { id: randomUUID(), dateCreated, products: [] }

    carts.push(newCart)
    await writeJSON(cartsFile, carts)

    return { message: 'Cart created successfully', data: newCart }
  }

  static async addProductToCart (id, productId) {
    const carts = await readJSON(cartsFile)
    const products = await readJSON(productsFile)

    // Verifica si el producto existe en productsFile
    const productExists = products.some((p) => p.id === productId)
    if (!productExists) return { error: 'Product not found', data: null }

    const cartsIndex = carts.findIndex((c) => c.id === id)
    if (cartsIndex === -1) return { error: 'Cart not found', data: null }

    const productIndex = carts[cartsIndex].products.findIndex((p) => p.product === productId)
    if (productIndex === -1) {
      carts[cartsIndex].products.push({ product: productId, quantity: 1 })
    } else {
      carts[cartsIndex].products[productIndex].quantity += 1
    }

    await writeJSON(cartsFile, carts)
    return { message: 'Product added to cart', data: carts[cartsIndex] }
  }
}
