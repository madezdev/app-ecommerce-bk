import express from 'express'
import cors from 'cors'

export class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT || 8080
    this.app.use(cors())
    this.app.use(express.json())
    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.app.use(express.json())
    this.app.use(cors())
  }

  routes () {
    this.app.get('/', (req, res) => {
      res.json({})
    })
  }

  start () {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}
