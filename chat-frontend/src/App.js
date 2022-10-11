import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ChatRoom from './components/ChatRoom'
import Home from './components/Home'

import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatRoom" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
