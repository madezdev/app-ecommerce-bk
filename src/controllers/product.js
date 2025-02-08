import { ProductModel } from '../models/product.js'
import { validateProduct, validateProductUpdate } from '../shemas/product.js'

export class ProductControllers {
  static async getAllProducts (req, res) {
    const { category } = req.query
    try {
      const result = await ProductModel.getAllProducts({ category })
      const quantityProducts = await result.data.length ?? 0
      if (result) return res.status(200).json({ quantityProducts, data: result.data })
      return res.status(404).json({ message: 'Products not found' })
    } catch (error) {
      console.error(error)
    }
  }

  static async getProductById (req, res) {
    const { id } = req.params
    try {
      const result = await ProductModel.getProductById(id)
      if (result.error) return res.status(404).json({ result })
      if (result) return res.status(200).json({ result })
    } catch (error) {
      console.error(error)
    }
  }

  static async createProduct (req, res) {
    const resultValitation = validateProduct(req.body)
    if (!resultValitation.success) return res.status(404).json({ error: JSON.parse(resultValitation.error.message) })
    try {
      const result = await ProductModel.createProduct(resultValitation.data)
      if (result.error) return res.status(400).json({ result })
      if (result) return res.status(201).json({ result })
    } catch (error) {
      console.error(error)
    }
  }

  static async updateProduct (req, res) {
    const { id } = req.params
    const resultValitation = validateProductUpdate(req.body)
    if (!resultValitation.success) return res.status(404).json({ error: JSON.parse(resultValitation.error.message) })
    try {
      const result = await ProductModel.updateProduct(id, req.body)
      if (result.error) return res.status(404).json({ result })
      if (result) return res.status(200).json({ result })
    } catch (error) {
      console.error(error)
    }
  }

  static async deleteProduct (req, res) {
    const { id } = req.params
    try {
      const result = await ProductModel.deleteProduct(id)
      if (result.error) return res.status(404).json({ result })
      if (result) return res.status(200).json({ result })
    } catch (error) {
      console.error(error)
    }
  }
}
