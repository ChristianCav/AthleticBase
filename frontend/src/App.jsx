import React from 'react'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { Routes, Route } from 'react-router'
import Navbar from './components/NavBar'
import HomePage from './pages/HomePage'

const App = () => {
  return (
      <div className='relative h-full w-full'>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/homepage" element={<HomePage />}></Route>
        </Routes>
      </div>
  )
}

export default App