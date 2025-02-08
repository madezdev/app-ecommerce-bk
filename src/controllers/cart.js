import { CartModel } from '../models/local-file-system/carts.js'

export class CartControllers {
  static async getCartById (req, res) {
    const { id } = req.params
    try {
      const result = await CartModel.getCartById(id)
      if (result.error) return res.status(404).json({ result })
      if (result) return res.status(200).json({ result })
    } catch (error) {
      console.error(error)
    }
  }

  static async createCart (req, res) {
    try {
      const result = await CartModel.createCart()
      if (result.error) return res.status(400).json({ result })
      if (result) return res.status(201).json({ result })
    } catch (error) {
      console.error(error)
    }
  }

  static async addProductToCart (req, res) {
    const { id, productId } = req.params
    try {
      const result = await CartModel.addProductToCart(id, productId)
      if (result.error) return res.status(404).json({ result })
      if (result) return res.status(200).json({ result })
    } catch (error) {
      console.error(error)
    }
  }
}
