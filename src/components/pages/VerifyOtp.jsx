import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/Auth';

const VerifyOtp = () => {
    const {API}= useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const preEmail = location.state?.email;
    const [form, setForm] = useState({email:preEmail , otp: "" });

    if(!location.state || !location.state?.email){
      return <div className='min-h-screen flex items-center justify-center font-bold'>Invalid OTP link</div>
    }

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    
        // clear error while typing
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // validation
        if (!form.otp) {
          return alert("OTP is required");
        }
    
        try {
            const response = await fetch(`${API}/auth/verify-otp`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
              });
        
              const resData = await response.json();
        
              if (response.ok) {
                alert   ("OTP confirm successfully ✅");
        
                // redirect after short delay
                setTimeout(() => {
                  navigate("/reset-password", { state: { email: form.email } });
                }, 1000);
        
              } else {
                alert(resData?.message || "Failed to match OTP");
              }
        } catch (error) {
          console.error("Error verifying OTP:", error);
          alert("An error occurred while verifying OTP. Please try again.");
        }
      };


  return (
    <>
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-300">
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
            <h1 className="text-2xl font-semibold mb-4">Verify OTP</h1>
            <form  onSubmit={handleSubmit}>
                <div className="mb-4">
                <label
                    htmlFor="otp"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Enter OTP
                </label>
                <input
                    type="text"
                    id="otp"
                    onChange={handleChange}
                    name="otp"
                    value={form.otp}
                    placeholder="Enter the OTP sent to your email"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
                </div>
                <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                >
                Verify OTP
                </button>
            </form>
            </div>
        </div>
    </>
  )
}

export default VerifyOtp