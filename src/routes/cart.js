import { Router } from 'express'
import { CartControllers } from '../controllers/cart.js'

export const cartRouter = Router()

cartRouter.get('/', CartControllers.getAllCarts)
cartRouter.get('/:id', CartControllers.getCartById)
cartRouter.post('/', CartControllers.createCart)
cartRouter.post('/:id/product/:productId', CartControllers.addProductToCart)
cartRouter.put('/:id/product/:productId/quantity/:quantity', CartControllers.updateProductInCart)
cartRouter.delete('/:id/product/:productId', CartControllers.deleteProductFromCart)
