
import React, { useEffect } from 'react'
import { useAuth } from '../store/Auth';
import { useNavigate } from 'react-router-dom';



const Logout = () => {

    const {userLogout ,API} = useAuth();
 const navigate = useNavigate();

    useEffect(()=>{
        userLogout();
        navigate('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


  return (
    <div>Logout.....</div>
  )
}

export default Logout