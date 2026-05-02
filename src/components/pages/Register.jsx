import React, { useState } from 'react';
import {useAuth} from "../store/Auth"
import { useNavigate } from 'react-router-dom';

const Register = () => {

  
const [form, setform] = useState({username:'', email:'', password:''});
const {API ,setLocalStorageToken } = useAuth();
const navigate = useNavigate();

const handleChange =  (e) => {
  const { name, value } = e.target;
  setform({...form, [name]: value});
};

const handleSubmit = async(e)=>{
  e.preventDefault();
  
try{

const response = await fetch(`${API}/auth/register`,{
  method:"POST",
  headers:{
    "Content-Type":"application/json"

  },
  body:JSON.stringify(form)
})

const resData = await response.json();
console.log(resData)
if(response.ok){
  setLocalStorageToken(resData.token);
  navigate('/');
}else{
  alert(resData.error?.message || resData?.message || "Registration failed");
}


}catch(err){
  console.log(err)

}

}

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-gray-300"
    >
      <div
        className="p-6 sm:max-w-auto"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1) ',
        }}
      >
        <h1
          className="text-2xl font-semibold mb-4 text-center"
          style={{ color: '#0A3625' }}
        >
          Register
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-1"
              style={{ color: '#0A3625' }}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name='username'
              placeholder='Enter your username'
              onChange={handleChange}
              value={form.username}
              className="w-full p-2 border"
              style={{
                borderColor: '#E0E0E0',
                borderRadius: '4px',
                backgroundColor: '#F9F9F9',
                color: '#0A3625',
              }}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1"
              style={{ color: '#0A3625' }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border"
              placeholder='Enter your email'
              onChange={handleChange}
              value={form.email}
              name='email'
              style={{
                borderColor: '#E0E0E0',
                borderRadius: '4px',
                backgroundColor: '#F9F9F9',
                color: '#0A3625',
              }}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
              style={{ color: '#0A3625' }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border"
              placeholder='**********'
              onChange={handleChange}
              value={form.password}
              name='password'
              style={{
                borderColor: '#E0E0E0',
                borderRadius: '4px',
                backgroundColor: '#F9F9F9',
                color: '#0A3625',
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-sm font-medium"
            style={{
              backgroundColor: '#0A3625',
              color: '#FFFFFF',
              borderRadius: '4px',
              border: 'none',
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;