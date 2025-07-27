import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import api from '../lib/axios.js';

const ProfilePage = () => {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const fetchProfile = async() =>{
            const token = localStorage.getItem("token");
            if(!token){
                toast.error("Couldn't load profile")
                return;
            }
            try{
                const res = await api.get("/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setProfile(res.data);
                console.log(res.data)
            }catch(error){
                toast.error("Couldn't load profile")
                console.error("Error in loading profile", error);
            }
        }
        fetchProfile();
    }, []);

    return (
        <div className='flex items-center justify-center bg-neutral-950 min-h-screen'>
            <div className='text-white'>
                <p>{profile.email}</p>
                <p>{profile.username}</p>
            </div>
        </div>
    )
}

export default ProfilePage