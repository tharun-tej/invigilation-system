import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { loginRoute } from '../Utils/APIRoutes';

const toastOptions = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const Login = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');

  const navigate = useNavigate();
  const validateEmail = () => {
    // Simple email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleLogin = async  (e)=>{
    e.preventDefault();
    validateEmail();
    if(!emailError){
      try
      {
      let res = await axios.post(loginRoute,{
          email,
          password,
      })
          res=res.data;
          if(res.status===true)
          {
              const usr = res.user;
              console.log('setting item');
              await localStorage.setItem('user',JSON.stringify(usr));
              console.log('setted item'+localStorage.getItem('user'));
              toast.info('successfully logged in.........');
              navigate("/registerExam");
          }
          else
          toast.error(res.message,toastOptions);
      }
      catch(error)
      {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage)
      }
    } 
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96 text-center">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">
            Email
          </label>
          <input
          required
            type="email"
            id="email"
            className={`w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500 ${
              emailError ? 'border-red-500' : ''
            }`}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError('');
            }}
            onBlur={validateEmail}
          />
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
        </div>
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
            Password
          </label>
          <div className="flex items-center">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              required
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="text-gray-500 hover:text-gray-700 focus:outline-none ml-2"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Login;
