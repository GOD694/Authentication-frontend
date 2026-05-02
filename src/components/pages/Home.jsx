import React from 'react'
import { useAuth } from '../store/Auth'

const Home = () => {

 const {userData} = useAuth();

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#e0e2c9]">
      <div className="w-80 bg-black/20 backdrop-blur-md rounded-2xl p-6 shadow-lg">

        <div className="flex flex-col gap-4">

          <h2 className="text-xl font-bold text-black text-center">
            User Profile
          </h2>

          <div className="bg-white/40 p-3 rounded-lg">
            <p className="text-sm text-gray-700">Username</p>
            <h3 className="font-semibold text-black">{userData ? userData.username :"user"}</h3>
          </div>

          <div className="bg-white/40 p-3 rounded-lg">
            <p className="text-sm text-gray-700">Email</p>
            <h3 className="font-semibold text-black">{userData ? userData.email :"Gmail"}</h3>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Home