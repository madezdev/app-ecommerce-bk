import { randomUUID } from 'crypto'
import { readJSON } from '../utils/utils'

const products = readJSON('./data/products.json')

export class ProductModel {
  static async getAllProducts ({ limit = 10, offset = 0, category = null }) {
    if (category) {
      return products.filter((product) => product.category === category)
    }
    return products.slice(offset, offset + limit)
  }

  static async getProductById (id) {
    const product = products.find((product) => product.id === id)
    return product
  }

  static async createProduct (product) {
    const newProduct = { id: randomUUID(), ...product }
    products.push(newProduct)
    return newProduct
  }

  static async updateProduct (id, product) {
    const index = products.findIndex((product) => product.id === id)
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
