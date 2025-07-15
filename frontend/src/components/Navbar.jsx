import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <div className='navbar sticky top-0 z-50 border-b-2 border-b-gray-600 bg-base-100'>
        <div className="navbar-content flex-1">
            <Link to="/" className='flex items-center gap-2'>
                <img src="/AthleticBaseLogo.png" alt="AthleticBase Logo" className='w-14 sm:wd-16 md:w-18 lg:w-20 xl:w-22 h-auto object-contain' />
                <span className='text-base-content text-3xl'>AthleticBase</span>
            </Link>
        </div>
        <div className="flex-none space-x-2">
            <Link to="/login" className='btn btn-ghost text-lg'>
                Login
            </Link>
            <Link to="/signup" className='btn btn-ghost text-lg'>
                Sign Up
            </Link>
        </div>
    </div>
  )
}

export default Navbar