import express from 'express'
import cors from 'cors'
import { productRouter } from '../routes/product.js'
import { cartRouter } from '../routes/cart.js'
import { create } from 'express-handlebars'
import http from 'http'
import { Server as SocketServer } from 'socket.io'
import { ProductModel } from '../models/local-file-system/product.js'

export class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT || 8088
    this.app.use(cors())
    this.app.use(express.json())
    this.middlewares()
    this.routes()
    this.server = http.createServer(this.app)
    this.io = new SocketServer(this.server)
    this.sockets()
    // Configurar Handlebars
    this.handlebars = create({ extname: '.handlebars' })
    this.app.engine('handlebars', this.handlebars.engine)
    this.app.set('view engine', 'handlebars')
    this.app.set('views', './src/views')
  }

  middlewares () {
    this.app.use(express.json())
    this.app.use(cors())
    this.app.use(express.static('public'))
  }

  routes () {
    this.app.use('/api/products', productRouter)
    this.app.use('/api/cart', cartRouter)

    // Ruta para la vista "home"
    this.app.get('/', async (req, res) => {
      const products = await ProductModel.getAllProducts({}) // Pasar un objeto vacío
      res.render('home', { products: products.data })
    })

    // Ruta para la vista "realTimeProducts"
    this.app.get('/realtimeproducts', async (req, res) => {
      const products = await ProductModel.getAllProducts({}) // Pasar un objeto vacío
      res.render('realTimeProducts', { products: products.data })
    })
  }

  sockets () {
    this.io.on('connection', async (socket) => {
      console.log('Cliente conectado', socket.id)

      // Enviar la lista de productos al cliente cuando se conecta
      const products = await ProductModel.getAllProducts({}) // Pasar un objeto vacío
      socket.emit('updateProducts', products.data)

      // Escuchar eventos de creación de productos
      socket.on('createProduct', async (product) => {
        await ProductModel.createProduct(product)
        const updatedProducts = await ProductModel.getAllProducts({}) // Pasar un objeto vacío
        this.io.emit('updateProducts', updatedProducts.data)
      })

      // Escuchar eventos de eliminación de productos
      socket.on('deleteProduct', async (id) => {
        await ProductModel.deleteProduct(id)
        const updatedProducts = await ProductModel.getAllProducts({}) // Pasar un objeto vacío
        this.io.emit('updateProducts', updatedProducts.data)
      })
    })
  }

  start () {
    this.server.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}
