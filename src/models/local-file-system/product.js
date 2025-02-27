import { randomUUID } from 'crypto'
import { readJSON, writeJSON } from '../../utils/utils.js'

const productsFile = './src/data/products.json'

export class ProductModel {
  static async getAllProducts ({ category = null } = {}) {
    const products = await readJSON(productsFile)
    if (category) {
      const productForCategory = products.filter((p) => p.category === category)
      return { message: `Get all products for category ${category}`, data: productForCategory }
    }
    return { message: 'Get all products', data: products }
  }

  static async getProductById (id) {
    const products = await readJSON(productsFile)
    const productById = products.find((p) => p.id === id)
    if (!productById) return { error: 'Product not found', data: null }
    return { message: 'Product found', data: productById }
  }

  static async createProduct (input) {
    const products = await readJSON(productsFile)
    const existingProduct = products.some((p) => p.title === input.title || p.code === input.code)
    if (existingProduct) return { error: 'Product already exists', data: null }
    const dateCreated = new Date().toISOString()
    const newProduct = { id: randomUUID(), dateCreated, ...input }

    products.push(newProduct)
    await writeJSON(productsFile, products)

    return { message: 'product created successfully', data: newProduct }
  }

  static async updateProduct (id, product) {
    const products = await readJSON(productsFile)
    const productIndex = products.findIndex((p) => p.id === id)
    if (productIndex === -1) return { error: 'Product not found', data: null }
    const dateUpdate = new Date().toISOString()
    products[productIndex] = { ...products[productIndex], ...product, dateUpdate }
    await writeJSON(productsFile, products)
    return { message: 'Product updated', data: products[productIndex] }
  }

  static async deleteProduct (id) {
    const products = await readJSON(productsFile)
    const productIndex = products.findIndex((p) => p.id === id)
    if (productIndex === -1) return { error: 'Product not found', data: null }
    products.splice(productIndex, 1)
    await writeJSON(productsFile, products)
    return { message: 'Product deleted', data: null }
  }
}
