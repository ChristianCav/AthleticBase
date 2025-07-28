import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import api from '../lib/axios.js'
import toast from 'react-hot-toast'
import NoPerformances from '../components/NoPerformances.jsx'
import PerformanceCard from '../components/PerformanceCard.jsx'
import { Link } from 'react-router'
import { Plus } from 'lucide-react'
import Spinner from '../components/Spinner.jsx'


const HomePage = () => {
  const [refreshFlag, setRefreshFlag] = useState(false)
  const [performances, setPerformances] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true);

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
        setIsAuthorized(true);
        console.log(res.data);
        setPerformances(res.data)
      }catch(error){
        toast.error("Couldn't fetch performances")
        if(error.response.status === 401) setIsAuthorized(false);
        console.error("Error in fetching performances", error);
      }finally{
        setIsLoading(false);
      }
    }
    fetchPerformances();
  }, [refreshFlag]);

  return (
    <div className='min-h-screen flex justify-center bg-neutral-950'>
      {isLoading && isAuthorized && <div className='text-white text-xl flex flex-row gap-x-5 items-center justify-center'>
        <Spinner />
        Loading performances...
        </div>}
      {performances.length === 0 && isAuthorized && !isLoading && <NoPerformances/>}
      {!isLoading && isAuthorized &&
        <div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 xl:grid-cols-3 text-white mt-28'>
            {performances.map(performance => (
              <PerformanceCard key={performance._id} performance={performance} setPerformances={setPerformances} setRefreshFlag={setRefreshFlag} />
            ))}
          </div>

          <div className="addPerformance bg-neutral-700 rounded-md">
            <div className='border border-white bg-neutral-800 hover:bg-neutral-700 rounded-md w-12 h-12 fixed z-20 right-10 bottom-10'>
              <Link to="/create" className='flex items-center justify-center h-full'>
                <Plus color='white' />
              </Link>
            </div>
          </div>
        </div>
      }
      {!isAuthorized && <div className='text-white text-xl'>Not authorized, please log in</div>}
    </div>
  )
}

export default HomePage
