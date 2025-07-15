import React from 'react'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { Routes, Route } from 'react-router'
import Navbar from './components/NavBar'

const App = () => {
  return (
    <div data-theme="dark">
      <div className='relative h-full w-full'>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<SignUp />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App