import React, { useState } from 'react'
import { ChevronDown, User, Users, Settings, LogOut, Activity } from 'lucide-react'
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
            <button className='btn btn-bordered px-3 rounded-xl border-gray-300 text-white text-lg flex items-center justify-center gap-1' onClick={() => setOpen(!open)}>
                {user.username}
                <ChevronDown size={20}></ChevronDown>
            </button>
            {open && (
                <div className='dropdown absolute right-1 mt-3 bg-neutral-800 rounded-xl shadow z-50 flex flex-col w-48'>
                    <button type='button' className='btn btn-ghost text-gray-100 pr-5 text-md' onClick={() => navigate("/homepage")}>
                        <Activity size={18}/>
                        Performances
                    </button>
                    <button type='button' onClick={() => navigate("/profile")} className='btn btn-ghost rounded-none text-gray-100 pr-5 text-md border-0 border-t border-gray-600'>
                        <User size={18}/>
                        Profile
                    </button>
                    <button type='button' onClick={() => navigate("/friends")} className='btn btn-ghost text-gray-100 pr-5 text-md border-t border-0 rounded-none border-gray-600'>
                        <Users size={18}/>
                        Friends
                    </button>
                    <button type='button' onClick={() => navigate("/settings")} className='btn btn-ghost text-gray-100 pr-5 text-md border-t border-0 rounded-none border-gray-600'>
                        <Settings size={18} />
                        Settings
                    </button>
                    <button type='button' onClick={handleLogout} className='btn btn-ghost text-gray-100 pr-5 text-md rounded-none border-0 border-t border-gray-600'>
                        <LogOut size={18}/>
                        Logout
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProfileDropdown