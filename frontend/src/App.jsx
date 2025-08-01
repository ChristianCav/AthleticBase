import React from 'react'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { Routes, Route } from 'react-router'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import CreatePerformance from './pages/CreatePerformance'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import FriendsPage from './pages/FriendsPage'
import PerformanceDetail from './pages/PerformanceDetail'

const App = () => {
  return (
      <div className='relative h-full w-full'>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/homepage" element={<HomePage />} />
          <Route path='/create' element={<CreatePerformance />} />
          <Route path='/performance/:id' element={<PerformanceDetail />} />
          <Route path='/profile' element={<ProfilePage />}></Route>
          <Route path='/settings' element={<SettingsPage />}></Route>
          <Route path='/friends' element={<FriendsPage />}></Route>
        </Routes>
      </div>
  )
}

export default App