import React, { createContext, useEffect, useState } from "react"
import { useContext } from "react";


const AuthContext = createContext();

//provider 

export const AuthProvider = ({children}) =>{

const API = import.meta.env.VITE_API_URL;
const accessToken = localStorage.getItem("accessToken") || null;
const [token, settoken] = useState(accessToken);
const islogin = !!token;
const isAuthorization = `Bearer ${token}`
const [userData ,setuserData] = useState({name:"",gmail:""});

const setLocalStorageToken = (token)=>{
    localStorage.setItem("accessToken", token);
    settoken(token);
};

const userLogout = ()=>{
     localStorage.removeItem("accessToken");
    settoken(null);
};

const getUserData = async()=>{
try {
    const response = await fetch(`${API}/auth/me`,{
        method:"GET",
        headers:{
            Authorization: isAuthorization, 
        },
        
        
    }) 
    if (response.ok) {
        const data = await response.json();
        
        setuserData(data.userData)
    } else {
        userLogout()
        setuserData({name:"",gmail:""});
    }
} catch (error) {
    console.log(error)
}
};

useEffect(()=>{
    if(islogin){

        // eslint-disable-next-line react-hooks/set-state-in-effect
        getUserData()
    }
//    userLogout();
},[token]);


 return (<AuthContext.Provider value={{API , setLocalStorageToken ,userLogout , islogin ,userData}} >
    {children}
    </AuthContext.Provider>)
 

};

// consumer
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = ()=>{
    const authContent = useContext(AuthContext);

    return authContent;
}


