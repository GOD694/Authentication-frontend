import React, { useState } from 'react';
import { useAuth } from "../store/Auth"
import { useLocation, useNavigate } from 'react-router-dom';



const ResetPass = () => {
  const location = useLocation()
  const { API } = useAuth();
  const navigate = useNavigate();
  const preEmail = location.state?.email;
  const [form, setform] = useState({ email: preEmail, password: "", confirmPassword: "" });
  if (!location.state || !location.state?.email) {
    return <div className='min-h-screen flex items-center justify-center'>Invalid reset link</div>
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setform({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {


      if (form.password !== form.confirmPassword) {
        alert("password not match")
        
      }

      const response = await fetch(`${API}/auth/reset-otp-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"

        },
        body: JSON.stringify(form)
      })
      const resData = await response.json();
      if (response.ok) {
        alert("password reset successfully, please login with new password");
        navigate('/login');
      } else {
        alert(resData.error?.message || resData?.message || "reset password  failed");
      }




    } catch (err) {
      console.log(err)

    }

  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-gray-300"
    >
      <div
        className="p-6 sm:p-8"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1
          className="text-2xl font-semibold mb-4 text-center"
          style={{ color: '#0A3625' }}
        >
          Set New Password
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
              style={{ color: '#0A3625' }}
            >
              New Password
            </label>
            <input
              type="text"
              id="password"
              className="w-full p-2 border"
              placeholder='Enter your password'
              name='password'
              onChange={handleChange}
              value={form.password}
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
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-1"
              style={{ color: '#0A3625' }}
            >
              Confirm Password
            </label>
            <input
              type="text"
              id="confirmPassword"
              className="w-full p-2 border"
              onChange={handleChange}
              name='confirmPassword'
              placeholder='confirm password'
              value={form.confirmPassword}
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

export default ResetPass;