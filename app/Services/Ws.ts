// app/Services/Ws.ts

import { Server } from 'socket.io'
import AdonisServer from '@ioc:Adonis/Core/Server'

class Ws {
  public io: Server
  private booted = false

  public boot() {
    if (this.booted) {
      return
    }

    this.booted = true
    this.io = new Server(AdonisServer.instance!)
    this.io.on('connection', (socket) => {
      console.log('A user connected')

      socket.emit('news', { hello: 'world' })

      socket.on('my other event', (data) => {
        console.log(data)
      })

      socket.on('disconnect', () => {
        console.log('A user disconnected')
      })
    })
  }
}

export default new Ws()
