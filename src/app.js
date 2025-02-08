import { Server } from './server/server.js'

const server = new Server()
server.routes()
server.start()
