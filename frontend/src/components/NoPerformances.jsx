import React from 'react'
import { Link } from 'react-router'

const NoPerformances = () => {
  return (
    <div className='h-full flex flex-col items-center gap-y-4 text-gray-200'>
        <h3 className='text-2xl font-bold'>No performances found</h3>
        <Link to="/create" className='btn btn-primary'>
            Log your first performance!
        </Link>
    </div>
  )
}

export default NoPerformances