import React, { use, useState } from 'react'
import { useLocation } from 'react-router'
import { useEffect } from 'react';
import api from '../lib/axios.js';
import toast from 'react-hot-toast';
import { formatDate } from '../lib/utils.js';
import Spinner from '../components/Spinner.jsx';

const PerformanceDetail = () => {
  const location = useLocation();
  const index = location.pathname.lastIndexOf("/")
  const id = location.pathname.substring(index+1)

  const [loading, setLoading] = useState(true);
  const [performance, setPerformance] = useState({});


  useEffect(() => {
    const fetchPerformance = async() =>{
      try{
        setLoading(true);
        const token = localStorage.getItem("token")
        const res = await api.get(`/performances/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log(res.data[0])
        setPerformance(res.data[0]);
      }catch(error){
        toast.error("Couldn't fetch performance");
        console.error("Error in fetching performance", error);
      }finally{
        setLoading(false);
      }
    }
    fetchPerformance();
  }, [])
  return (
      <div className='flex items-center justify-center gap-y-2 bg-neutral-950 min-h-screen'>      
        {!loading && performance && <div>
          <p className='text-white'>{performance.title}</p>
          <p className='text-white'>{formatDate(new Date(performance.date))}</p>
          <p className='text-white'>{performance.location}</p>
          <p className='text-white'>{performance.type}</p>
          <p className='text-white'>{performance.duration}</p>
          <p className='text-white'>{performance.data.goals}</p>
          </div>
        }
        {loading && <div className='text-white text-xl flex flex-row gap-x-5 items-center justify-center'>
          <Spinner />
          Loading performance...
        </div>}
      </div>  
    )
}

export default PerformanceDetail