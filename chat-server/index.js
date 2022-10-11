const server = require('http').createServer()
const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
})

const PORT = 4000

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage'
const PREVIOUS_CHAT_MESSAGE_EVENT = 'prevChatMessage'
const roomMessages = {}

io.on('connection', socket => {
  console.log(`Client ${socket.id} connected`)

  // Join a conversation
  const { roomId } = socket.handshake.query
  socket.join(roomId)
  if (roomMessages[roomId]) {
    socket.emit(PREVIOUS_CHAT_MESSAGE_EVENT, roomMessages[roomId])
  } else {
    roomMessages[roomId] = []
  }

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, data => {
    roomMessages[roomId].push(data)
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data)
  })

  // Leave the room if the user closes the socket
  socket.on('disconnect', () => {
    socket.leave(roomId)
  })
})

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
