import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <>
    <div className='w-full h-screen flex flex-col gap-6 items-center justify-center bg-[#CCDA47] '>
    <h1 className='text-5xl font-bold text-[#0A3625]' >404</h1>
  <h1 className='text-5xl font-bold text-[#0A3625]'> Page Not Found</h1>
  <button className='bg-[#0A3625] rounded-2xl px-5 py-2 mx-7 hover:bg-gray-800 text-white/40'><Link to="/"> Home Page</Link></button>
        
    </div>
    </>
  )
}

export default ErrorPage