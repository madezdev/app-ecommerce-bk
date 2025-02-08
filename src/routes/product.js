import { Router } from 'express'
import { ProductControllers } from '../controllers/product.js'

export const productRouter = Router()

productRouter.get('/', ProductControllers.getAllProducts)
productRouter.get('/:id', ProductControllers.getProductById)
productRouter.post('/', ProductControllers.createProduct)
productRouter.put('/:id', ProductControllers.updateProduct)
productRouter.delete('/:id', ProductControllers.deleteProduct)
