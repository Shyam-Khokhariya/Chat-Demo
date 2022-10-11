import React, { useEffect, useRef, useState } from 'react'

import './ChatRoom.css'
import { Box, Button, List, ListItem, ListItemText, TextField, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import useChat from '../../hooks/useChat'

const ChatRoom = () => {
  const name = localStorage.getItem('Name')
  const roomId = localStorage.getItem('RoomId')
  const { messages, sendMessage } = useChat(name, roomId)
  const [newMessage, setNewMessage] = useState('')
  const bottomRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleNewMessageChange = event => {
    setNewMessage(event.target.value)
  }

  const handleSendMessage = () => {
    if (newMessage) {
      sendMessage(newMessage)
      setNewMessage('')
    }
  }

  const handleLeaveRoom = () => {
    localStorage.clear()
    navigate('/')
  }

  const handleKeypress = e => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <Box className="chat-room-container">
      <Box display={'flex'} justifyContent="space-between">
        <Typography variant="h3">Room: {roomId}</Typography>
        <Box justifyContent={'center'}>
          <Button variant="contained" size="small" onClick={handleLeaveRoom}>
            Leave Room
          </Button>
        </Box>
      </Box>
      <Box className="messages-container">
        <List>
          {messages.map((message, i) => (
            <ListItem key={i}>
              <Box sx={{ width: '100%' }}>
                <Box
                  className={`message-item ${
                    message.ownedByCurrentUser ? 'my-message' : 'received-message'
                  }`}
                >
                  <Typography
                    color={'#1a237e'}
                    fontWeight="bold"
                    textAlign={message.ownedByCurrentUser ? 'right' : 'left'}
                  >
                    {message.senderName} ({moment(message.createdAt).format('HH:mm')})
                  </Typography>
                  <ListItemText primary={message.body} />
                </Box>
              </Box>
            </ListItem>
          ))}
          <div ref={bottomRef} />
        </List>
      </Box>
      <Box className="message-input-container">
        <TextField
          variant="outlined"
          type="text"
          placeholder="Write message..."
          value={newMessage}
          onChange={handleNewMessageChange}
          size="small"
          fullWidth
          onKeyPress={handleKeypress}
          sx={{ mr: 3 }}
        />
        <Button variant="contained" onClick={handleSendMessage} endIcon={<SendIcon />}>
          Send
        </Button>
      </Box>
    </Box>
  )
}

export default ChatRoom
