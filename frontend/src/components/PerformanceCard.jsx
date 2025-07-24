import React from 'react'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils.js'

const PerformanceCard = ({performance, setPerformances}) => {
  return (
    <Link to={`/performance/${performance._id}`} className='card bg-neutral-800 hover:shadow-lg hover:bg-neutral-700 transition-all duration-200 border-t-4 border-solid border-[#f3eeeed5]'>
        <div className='card-body'>
            <h3 className='card-title text-base-content'>{performance.title}</h3>
            <p className='type text-gray-300'>{performance.type}</p>
            <p className='date text-gray-300'>{formatDate(new Date(performance.createdAt))}</p>
        </div>

    </Link>
  )
}

export default PerformanceCard