import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import api from '../lib/axios.js'
import toast from 'react-hot-toast'
import NoPerformances from '../components/NoPerformances.jsx'
import PerformanceCard from '../components/PerformanceCard.jsx'

const HomePage = () => {
  const [performances, setPerformances] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    const fetchPerformances = async() =>{
      try{
        const token = localStorage.getItem('token')
        console.log(token);
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
      {isLoading && <div className='text-white'>Loading performances...</div>}
      {performances.length === 0 && <NoPerformances/>}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-white'>
        {performances.map(performance => (
          <PerformanceCard key={performance._id} performance={performance} setPerformances={setPerformances} />
        ))}
      </div>
    </div>
  )
}

export default HomePage
