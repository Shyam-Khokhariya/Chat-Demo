import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import socketIOClient from 'socket.io-client'
import moment from 'moment'

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage'
const PREVIOUS_CHAT_MESSAGE_EVENT = 'prevChatMessage'
const SOCKET_SERVER_URL = 'http://localhost:4000'

const useChat = (name, roomId) => {
  const [messages, setMessages] = useState([])
  const socketRef = useRef()
  const navigate = useNavigate()
  useEffect(() => {
    if (!name || !roomId) {
      navigate('/')
    }
    
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { name, roomId }
    })

    socketRef.current.on(PREVIOUS_CHAT_MESSAGE_EVENT, message => {
      const incomingMessage = message.map(obj => ({
        ...obj,
        ownedByCurrentUser: obj.senderName === name
      }))
      setMessages(messages => [...messages, ...incomingMessage])
    })

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, message => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderName === name
      }
      setMessages(messages => [...messages, incomingMessage])
    })

    return () => {
      socketRef.current.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, roomId])

  const sendMessage = messageBody => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderName: name,
      senderId: socketRef.current.id,
      createdAt: moment()
    })
  }

  return { messages, sendMessage }
}

export default useChat
