import React, { useState } from 'react';
import { CiMenuFries } from "react-icons/ci";
import { NavLink } from 'react-router-dom';
import { useAuth } from '../store/Auth';


const NavLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { islogin } = useAuth();

  return (
    <>
      <section className="w-full h-16 bg-[#217f5b] text-white flex items-center justify-between px-15">
        <div className="text-lg font-bold">Arslan<span className='text-blue-300'>.</span></div>
        <nav>
          <div className="hidden md:flex space-x-10">
            {islogin ? (<>


              <NavLink to="/logout" className="hover:text-gray-400" >Logout</NavLink>


            </>) : (<>


              <NavLink to="/forget-password" className="hover:text-gray-400" >forget Password</NavLink>
              <NavLink to="/send-otp" className="hover:text-gray-400" >Send OTP</NavLink>
              <NavLink to="/login" className="hover:text-gray-400" >Login</NavLink>
              <NavLink to="/register" className="hover:text-gray-400">Register</NavLink>


            </>)}
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none text-2xl font-bold"
            >
              <CiMenuFries />
            </button>
          </div>
        </nav>
      </section>
      {isMenuOpen && (
        <div className="md:hidden bg-[#0A3625] text-white flex flex-col items-center space-y-2 py-4">
          {islogin ? (<NavLink to="/logout" className="hover:text-gray-400" >Logout</NavLink>
          ) : (<>
            <NavLink to="/forget-password" className="hover:text-gray-400" >forget Password</NavLink>
            <NavLink to="/send-otp" className="hover:text-gray-400" >Send OTP</NavLink>
            <NavLink to="/login" className="hover:text-gray-400" >Login</NavLink>
            <NavLink to="/register" className="hover:text-gray-400">Register</NavLink>
          </>)}
        </div>
      )}
    </>
  );
};

export default NavLayout;