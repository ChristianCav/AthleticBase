import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const ProfileDropdown = ({ user }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        toast.success("Logout successful!")
        navigate("/")
    }

    return (
        <div className='profile-dropdown pr-4'>
            <button className='btn btn-bordered px-3 border-gray-300 text-white text-lg flex items-center justify-center gap-1' onClick={() => setOpen(!open)}>
                {user.username}
                <ChevronDown size={20}></ChevronDown>
            </button>
            {open && (
                <div className='dropdown absolute right-1 mt-3 bg-neutral-800 rounded-lg shadow z-50 flex flex-col w-40'>
                    <button type='button' className='btn btn-ghost text-white pr-5 text-md' onClick={() => navigate("/homepage")}>Performances</button>
                    <button type='button' className='btn btn-ghost text-white pr-5 text-md'>Profile</button>
                    <button type='button' className='btn btn-ghost text-white pr-5 text-md'>Friends</button>
                    <button type='button' onClick={handleLogout} className='btn btn-ghost text-white pr-5 text-md'>Logout</button>
                </div>
            )}
        </div>
    )
}

export default ProfileDropdown