import { CartModel } from '../models/local-file-system/carts.js'

export class CartControllers {
  static async getAllCarts (req, res) {
    try {
      const result = await CartModel.getAllCarts()
      const quantityCarts = await result.data.length ?? 0
      if (result) return res.status(200).json({ quantityCarts, data: result.data })
      return res.status(404).json({ message: 'Carts not found' })
    } catch (error) {
      console.error(error)
    }
  }

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

  static async updateProductInCart (req, res) {
    const { id, productId, quantity } = req.params // Tomamos quantity de params
    const parsedQuantity = parseInt(quantity, 10) // Convertimos a número

    if (isNaN(parsedQuantity) || parsedQuantity < 0) {
      return res.status(400).json({ error: 'Invalid quantity value' })
    }

    try {
      const result = await CartModel.updateProductInCart(id, productId, parsedQuantity)
      if (result.error) return res.status(404).json({ result })
      return res.status(200).json({ result })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  static async deleteProductFromCart (req, res) {
    const { id, productId } = req.params
    try {
      const result = await CartModel.deleteProductFromCart(id, productId)
      if (result.error) return res.status(404).json({ result })
      if (result) return res.status(200).json({ result })
    } catch (error) {
      console.error(error)
    }
  }
}
