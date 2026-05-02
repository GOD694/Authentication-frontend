import React, { useState } from 'react';
import { useAuth } from "../store/Auth";
import { useNavigate } from 'react-router-dom';

const SendOtp = () => {

  const [form, setForm] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { API } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // clear error while typing
    setError("");
  };

  // ✅ simple email validation
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!form.email) {
      return setError("Email is required");
    }

    if (!validateEmail(form.email)) {
      return setError("Invalid email format");
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API}/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const resData = await response.json();

      if (response.ok) {
        setSuccess("OTP sent successfully ✅");

        // redirect after short delay
        setTimeout(() => {
          navigate("/verify-otp", { state: { email: form.email } });
        }, 1000);

      } else {
        setError(resData?.message || "Failed to send OTP");
      }

    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
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
        <h1 className="text-2xl font-semibold mb-4 text-center" style={{ color: '#0A3625' }}>
          Forget Password
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#0A3625' }}>
              Email
            </label>

            <input
              type="email"
              className="w-full p-2 border"
              placeholder='Enter your email'
              name='email'
              onChange={handleChange}
              value={form.email}
              disabled={loading}
              style={{
                borderColor: '#E0E0E0',
                borderRadius: '4px',
                backgroundColor: '#F9F9F9',
                color: '#0A3625',
              }}
            />
          </div>

          {/* ✅ Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* ✅ Success Message */}
          {success && (
            <p className="text-green-600 text-sm text-center">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-sm font-medium"
            style={{
              backgroundColor: loading ? '#6b7280' : '#0A3625',
              color: '#FFFFFF',
              borderRadius: '4px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendOtp;