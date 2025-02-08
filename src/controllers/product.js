import { ProductModel } from '../models/produc.js'
import { validateProduct, validateProductUpdate } from '../shemas/product.js'

export class ProductControllers {
  static async getAllProducts (req, res) {
    const { category } = req.query
    const products = await ProductModel.getAllProducts({ category })
    const quantityProducts = products.length ?? 0
    if (products) return res.status(200).json({ message: 'Get all products', quantity: quantityProducts, data: products })
    return res.status(404).json({ message: 'Products not found' })
  }

  static async getProductById (req, res) {
    const { id } = req.params
    const product = await ProductModel.getProductById(id)
    if (product) return res.status(200).json({ message: `Get product by ${id}`, data: product })
    return res.status(404).json({ message: 'Product not found' })
  }

  static async createProduct (req, res) {
    const result = validateProduct(req.body)
    if (!result.success) return res.status(404).json({ error: JSON.parse(result.error.message) })
    return res.status(200).json.json({ message: 'Create a product' })
  }

  static async updateProduct (req, res) {
    const { id } = req.params
    const result = validateProductUpdate(req.body)
    if (!result.success) return res.status(404``).json({ error: JSON.parse(result.error.message) })
    const updatedProduct = await ProductModel.updateProduct(id, req.body)
    if (updatedProduct) return res.status(200).json({ message: `Update a product ${id}`, data: updatedProduct })
  }

  static async deleteProduct (req, res) {
    const { id } = req.params
    const result = await ProductModel.deleteProduct(id)
    if (result) return res.status(200).json({ message: 'Delete a product' })
    if (result === false) return res.status(404).json({ message: 'Delete a product' })
  }
}
