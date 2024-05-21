const io = require('socket.io-client')
const socket = io('http://localhost:3333')

socket.on('connect', () => {
  console.log('Connected to server')
})

socket.on('update:users', (users) => {
  console.log('Usuarios actualizados:', users)
})

socket.on('disconnect', () => {
  console.log('Disconnected from server')
})
