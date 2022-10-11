import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'

const Home = () => {
  const [roomName, setRoomName] = React.useState('')
  const [userName, setUserName] = React.useState('')
  const navigate = useNavigate()
  useEffect(() => {
    const name = localStorage.getItem('Name')
    const roomId = localStorage.getItem('RoomId')
    if (name && roomId) {
      navigate('/chatRoom', { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleRoomNameChange = event => {
    setRoomName(event.target.value)
  }
  const handleUserNameChange = event => {
    setUserName(event.target.value)
  }

  const handleJoinRoom = e => {
    if (!userName) {
      Swal.fire({
        toast: true,
        icon: 'error',
        title: 'Enter user name.',
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      })
      return
    } else if (!roomName) {
      Swal.fire({
        toast: true,
        icon: 'error',
        title: 'Enter room name.',
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      })
      return
    }
    localStorage.setItem('Name', userName)
    localStorage.setItem('RoomId', roomName)
    navigate('/chatRoom')
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12} md={6}>
        <Box className="home-container">
          <Typography variant="h5" textAlign="center">
            Enter Details to start chat
          </Typography>
          <TextField
            label="User Name"
            variant="outlined"
            type="text"
            value={userName}
            onChange={handleUserNameChange}
            sx={{ mt: 5 }}
          />
          <TextField
            label="Room"
            variant="outlined"
            type="text"
            value={roomName}
            onChange={handleRoomNameChange}
            sx={{ mt: 5 }}
          />
          <Button variant="contained" onClick={handleJoinRoom} sx={{ mt: 5 }}>
            Join room
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Home
