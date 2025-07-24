import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import api from '../lib/axios.js'
import toast from 'react-hot-toast'
import NoPerformances from '../components/NoPerformances.jsx'
import PerformanceCard from '../components/PerformanceCard.jsx'
import { Link } from 'react-router'
import { Plus } from 'lucide-react'

const HomePage = () => {
  const [performances, setPerformances] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    const fetchPerformances = async() =>{
      try{
        const token = localStorage.getItem('token')
        console.log(token);
        setIsLoading(true);
        const res = await api.get("/performances", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(res.data);
        setPerformances(res.data)
      }catch(error){
        toast.error("Couldn't fetch performances")
        console.error("Error in fetching performances", error);
      }finally{
        setIsLoading(false);
      }
    }
    fetchPerformances();
  }, []);

  return (
    <div className='min-h-screen flex items-center justify-center bg-neutral-950'>
      {isLoading && <div className='text-white text-xl'>Loading performances...</div>}
      {performances.length === 0 && !isLoading && <NoPerformances/>}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:grid-cols-4 text-white'>
        {performances.map(performance => (
          <PerformanceCard key={performance._id} performance={performance} setPerformances={setPerformances} />
        ))}
      </div>

      <div className="addPerformance bg-neutral-700 rounded-md">
        <div className='border border-white rounded-md w-12 h-12 fixed z-20 right-10 bottom-10'>
          <Link to="/create" className='flex items-center justify-center h-full'>
            <Plus color='white' />
          </Link>
        </div>
      </div>

    </div>
  )
}

export default HomePage
