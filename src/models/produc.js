import { randomUUID } from 'crypto'
import { readJSON } from '../utils/utils.js'

const products = readJSON('../data/products.json')

export class ProductModel {
  static async getAllProducts ({ limit = 10, offset = 0, category = null }) {
    if (category) {
      return products.filter((p) => p.category === category)
    }
    return products
  }

  static async getProductById (id) {
    const product = products.find((p) => p.id === id)
    return product
  }

  static async createProduct (product) {
    const newProduct = { id: randomUUID(), ...product }
    products.push(newProduct)
    return newProduct
  }

  static async updateProduct (id, product) {
    const index = products.findIndex((p) => p.id === id)
    if (index === -1) return false
    products[index] = { ...products[index], ...product }
    return products[index]
  }

  static async deleteProduct (id) {
    const productIndex = products.findIndex((p) => p.id === id)
    if (productIndex === -1) return false
    products.splice(productIndex, 1)
    return true
  }
}
