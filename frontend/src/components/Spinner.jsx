import React from 'react'
import { LoaderIcon } from 'react-hot-toast'

const Spinner = () => {
  return (
    <div className='flex justify-center items-center'>
        <LoaderIcon className='animate-spin min-w-10 min-h-10 text-gray-600' />
    </div>
  )
}

export default Spinner