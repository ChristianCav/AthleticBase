import React from 'react'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils.js'
import { Trash } from 'lucide-react'
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

  return (
    <Link to={`/performance/${performance._id}`} className='card bg-neutral-800 hover:shadow-lg hover:bg-neutral-700 transition-all duration-200 border-t-4 border-solid border-[#f3eeeed5]'>
        <div className='card-body'>
            <h3 className='card-title text-base-content'>{performance.title}</h3>
            <p className='type text-gray-300'>{performance.type}</p>
            <p className='date text-gray-300'>{formatDate(new Date(performance.date))}</p>
            <button className='absolute right-4 bottom-6' onClick={handleDelete}><Trash size={22} /></button>
        </div>

    </Link>
  )
}

export default PerformanceCard