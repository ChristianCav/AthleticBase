import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import api from '../lib/axios.js';
import { Star, Edit } from 'lucide-react'
import Performance from '../../../backend/src/models/Performance.js'
import { set } from 'mongoose';

const ProfilePage = () => {
    const [profile, setProfile] = useState({});
    const [stats, setStats] = useState({})

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
                const stats = await api.get("/users/stats", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }                    
                })
                setProfile(res.data);
                setStats(stats.data)
                console.log(stats.data)
                console.log(res.data)
            }catch(error){
                toast.error("Couldn't load profile")
                console.error("Error in loading profile", error);
            }
        }
        fetchProfile();
    }, []);

    return (
        <div className="min-h-screen bg-neutral-950 text-white px-6 py-10">
            {/* Profile Header */}
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 mb-10">
                <img
                src="/avatar-placeholder.png"
                alt="User Avatar"
                className="w-32 h-32 rounded-full object-cover border-4 border-neutral-900"
                />
                <div className="flex flex-col gap-2 text-center md:text-left">
                <h1 className="text-3xl font-bold">{profile.username}</h1>
                <p className="text-gray-400">{profile.email}</p>
                <button className="btn btn-outline btn-sm w-fit mt-2 flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit Profile
                </button>
                </div>
            </div>

            {/* Stats */}
            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 text-center mb-10">
                <div className="bg-neutral-900 p-4 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold">{stats.numPerformances}</h2>
                <p className="text-gray-400">Performances</p>
                </div>
                <div className="bg-neutral-900 p-4 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold">112 hrs</h2>
                <p className="text-gray-400">Total Duration</p>
                </div>
                <div className="bg-neutral-900 p-4 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold flex items-center justify-center gap-1">
                    {stats.numStarredPerformances} <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </h2>
                <p className="text-gray-400">Starred</p>
                </div>
            </div>

            {/* Tabs Section */}
            <div className="max-w-4xl mx-auto">
                <div role="tablist" className="tabs tabs-boxed bg-base-200 justify-center">
                <input type="radio" name="tab" role="tab" className="tab" aria-label="Performances" defaultChecked />
                <input type="radio" name="tab" role="tab" className="tab" aria-label="Settings" />
                <input type="radio" name="tab" role="tab" className="tab" aria-label="Achievements" />
                </div>

                <div className="mt-6">
                {/* You can render conditional components here based on the selected tab */}
                <div className="bg-neutral-900 p-6 rounded-xl text-gray-400 text-center">
                    <p>Select a tab to view your content.</p>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage