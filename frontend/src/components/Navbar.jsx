import React from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router'
import { useNavigate, useLocation } from 'react-router'

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogoClick = () => {
        const current = location.pathname
        if(current === "/homepage" || current === "/createpage"){
            navigate("/homepage")
        }
        else{
            navigate("/")
        }
    }

    const handleLogout = () => {
        localStorage.clear();
        toast.success("Logout successful!")
        navigate("/")
    }

    return (
        <div className='navbar fixed left-0 max-h-20 top-0 z-50 border-b backdrop-blur-sm border-white/20 bg-neutral-950/30'>
            <div className="navbar-content flex-1">
                <button
                onClick={handleLogoClick}
                className='flex items-center gap-1 focus:outline-none'
                >
                <img
                    src="/AthleticBaseLogo.png"
                    alt="AthleticBase Logo"
                    className='w-14 sm:w-16 md:w-18 lg:w-20 xl:w-22 h-auto object-contain'
                />
                <span className='text-3xl text-white font-semibold'>AthleticBase</span>
                </button>
            </div>
            {location.pathname === "/" && !localStorage.getItem('user') && (
                <div className="flex-none space-x-2">
                    <Link to="/login" className='btn btn-ghost text-lg text-white'>
                        Login
                    </Link>
                    <Link to="/signup" className='btn btn-ghost text-lg text-white'>
                        Sign Up
                    </Link>
                </div>)
            }
            {localStorage.getItem('user') && (
                <div className='logout'>
                    <button type='button' onClick={handleLogout} className='btn btn-ghost text-white pr-5 text-lg'>Log out</button>
                </div>
            )}
        </div>
    )
}

export default Navbar