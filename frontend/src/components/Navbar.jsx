import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <div className='navbar fixed left-0 top-0 z-50 border-b backdrop-blur-sm border-white/20 bg-neutral-950/30'>
        <div className="navbar-content flex-1">
            <Link to="/" className='flex items-center gap-1'>
                <img src="/AthleticBaseLogo.png" alt="AthleticBase Logo" className='w-14 sm:w-16 md:w-18 lg:w-20 xl:w-22 h-auto object-contain' />
                <span className='text-3xl text-gray-200 font-semibold'>AthleticBase</span>
            </Link>
        </div>
        <div className="flex-none space-x-2">
            <Link to="/login" className='btn btn-ghost text-lg text-gray-200'>
                Login
            </Link>
            <Link to="/signup" className='btn btn-ghost text-lg text-gray-200'>
                Sign Up
            </Link>
        </div>
    </div>
  )
}

export default Navbar