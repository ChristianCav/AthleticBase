import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import api from '../lib/axios.js';
import { Star, Edit, Activity } from 'lucide-react'
import { Link } from 'react-router';
import Spinner from '../components/Spinner.jsx';

const ProfilePage = () => {
    const [profile, setProfile] = useState({});
    const [stats, setStats] = useState({})
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async() =>{
            const token = localStorage.getItem("token");
            if(!token){
                toast.error("Couldn't load profile")
                return;
            }
            try{
                setLoading(true);
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
            }finally{
                setLoading(false);
            }
        }
        fetchProfile();
    }, []);

    return (
        <div className="min-h-screen bg-neutral-950 text-white px-6 py-10">
            {!loading && <div>
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 mb-8 mt-20">
                    <img
                        src="../public/profile-pic.jpg"
                        alt="User Avatar"
                        className="w-32 h-32 rounded-full object-cover border-4 border-neutral-900"
                    />
                    <div className="flex flex-col gap-2 text-center md:text-left">
                        <h1 className="text-3xl font-bold">{profile.username}</h1>
                        <p className="text-gray-400">{profile.email}</p>
                        <p className="text-gray-400 text-sm">{profile._id}</p>
                    </div>
                </div>
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center mb-10">
                    <Link to="/homepage" className="bg-neutral-900 p-4 rounded-xl shadow-sm hover:bg-neutral-700">
                        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">{stats.numPerformances} <Activity className='w-4 h-4' /></h2>
                        <p className="text-gray-400">Performances</p>
                    </Link>
                    <div className="bg-neutral-900 p-4 rounded-xl shadow-sm hover:bg-neutral-700">
                        <h2 className="text-2xl font-bold">112</h2>
                        <p className="text-gray-400">Tracking</p>
                    </div>
                    <div className="bg-neutral-900 p-4 rounded-xl shadow-sm hover:bg-neutral-700">
                        <h2 className="text-2xl font-bold">124</h2>
                        <p className="text-gray-400">Trackers</p>
                    </div>
                    <div className="bg-neutral-900 p-4 rounded-xl shadow-sm hover:bg-neutral-700">
                    <h2 className="text-2xl font-bold flex items-center justify-center gap-1">
                        {stats.numStarredPerformances} <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </h2>
                    <p className="text-gray-400">Starred</p>
                    </div>
                </div>
            </div>}
            {loading && 
                <div className='text-white text-xl flex flex-row gap-x-5 items-center justify-center mt-52'>
                    <Spinner />
                    Loading profile...
                </div>}
        </div>
    )
}

export default ProfilePage