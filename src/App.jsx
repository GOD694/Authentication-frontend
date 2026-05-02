import React from 'react'
import {  Route, Routes,  } from 'react-router-dom'
import NavLayout from './components/layout/NavLayout'
import Home from './components/pages/Home'
import { lazy, Suspense } from "react";

// Lazy imports
const Register = lazy(() => import('./components/pages/Register'));
const Login = lazy(() => import('./components/pages/Login'));
const ErrorPage = lazy(() => import('./components/pages/ErrorPage'));
const Footer = lazy(() => import('./components/layout/Footer'));
const Logout = lazy(() => import('./components/pages/Logout'));
const SendResetLink = lazy(() => import('./components/pages/SendResetLink'));
const VerifyOtp = lazy(() => import('./components/pages/VerifyOtp'));
const SendOtp = lazy(() => import('./components/pages/SendOtp'));
const ResetPass = lazy(() => import('./components/pages/ResetPass'));
const VerifyResetLink = lazy(() => import('./components/pages/VerifyResetLink'));

const App = () => {
  return (
    <>
      <NavLayout />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/forget-password' element={<SendResetLink />} />
        <Route path='/link/reset/:token' element={<VerifyResetLink />} />
        <Route path='/reset-password' element={<ResetPass />} />
        <Route path='/send-otp' element={<SendOtp />} />
        <Route path='/verify-otp' element={<VerifyOtp />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    <Footer />

    </>
  )
}

export default App