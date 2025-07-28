import React from 'react'
import { Link } from 'react-router'
import { formatDate, shortenTitle } from '../lib/utils.js'
import { Trash, Star } from 'lucide-react'
import api from '../lib/axios.js'
import toast from 'react-hot-toast'


const PerformanceCard = ({performance, setPerformances, setRefreshFlag}) => {
  const token = localStorage.getItem("token");

  const handleDelete = async(e) => {
    e.preventDefault();
    try{
      if(!window.confirm("Are you sure you want to delete this performance?")) return
      const res = await api.delete(`/performances/${performance._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setRefreshFlag(prev => !prev)
        toast.success("Performance deleted successfully");
    }catch(error){
      console.log("Error deleting performance", error);
      toast.error("Couldn't delete performance")
    }
  }

  const handleStar = async(e) => {
    e.preventDefault();
    try{
      const currentStarred = performance.starred;
      const res = await api.put(`/performances/${performance._id}`, {starred: !currentStarred}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
      })
      if(currentStarred){
        toast.success("Unstarred Performance")
      } 
      else{
        toast.success("Starred Performance");
      } 
      setRefreshFlag(prev => !prev);
    }catch(error){
      console.log("Error starring performance", error);
      toast.error("Couldn't star performance")
    }
  }

  return (
    <Link to={`/performance/${performance._id}`} className='card bg-neutral-800 hover:shadow-lg hover:bg-neutral-700 transition-all duration-200 border-t-4 border-solid border-[#f3eeeed5]'>
        <div className='card-body'>
          <h3 className='card-title text-base-content pr-5'>{shortenTitle(performance.title)}</h3>
          <div className='absolute right-0 top-9 mr-4'>
            <button onClick={handleStar}>{performance.starred ? <Star size={22} color='yellow-300' className='fill-yellow-300' /> : <Star size={22} />}</button>
          </div>
          <p className='type text-gray-300'>{performance.type}</p>
          <p className='date text-gray-300'>{formatDate(new Date(performance.date))}</p>
          <button className='absolute right-4 bottom-6' onClick={handleDelete}><Trash size={22} /></button>
        </div>

    </Link>
  )
}

export default PerformanceCard