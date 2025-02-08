import { Router } from 'express'
import { CartControllers } from '../controllers/cart.js'

export const cartRouter = Router()

cartRouter.get('/:id', CartControllers.getCartById)
cartRouter.post('/', CartControllers.createCart)
cartRouter.post('/:id/product/:productId', CartControllers.addProductToCart)
