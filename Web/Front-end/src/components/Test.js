import React, { useState } from 'react';
import axios from 'axios';
import { WEB_LOGO } from '../utils/config';

const LoginForm = () => {
  const [submitMessage, setSubmitMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    description : ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:3000/users/signup', formData);

      const data = response.data;
      console.log(data);
      localStorage.setItem('token', data?.token);
      localStorage.setItem('userName', data?.data?.user?.name);
      localStorage.setItem('email', data?.data?.user?.email);
      localStorage.setItem('description', data?.data?.user?.description);
      console.log(localStorage.getItem('token'));
      // Update UI or redirect to authenticated route
      window.location.href = '/';
      setSubmitMessage(`Welcome, ${data?.data?.user?.name}!`);
      console.log(submitMessage);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <form className='flex flex-col items-center mt-16 mx-10 p-4 shadow-lg border border-gray-300 rounded-lg w-1/3'>
        <div className='mt-5'>
          <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src={WEB_LOGO} alt="logo"/>
          <span className="italic">DCCIP</span></a></div>
          <h1 className='content-center m-5 text-4xl text-cyan-400'>Create an account</h1>
          <div className="flex flex-col mb-6">  
            <input className='p-2 m-2 border-b-2 border-gray-300 hover:border-cyan-200 focus:outline-none' type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
            <input className='p-2 m-2 border-b-2 border-gray-300 hover:border-cyan-200 focus:outline-none' type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            <input className='p-2 m-2 border-b-2 border-gray hover:border-cyan-200 focus:outline-none' type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
            <input className='p-2 m-2 border-b-2 border-gray-300 hover:border-cyan-200 focus:outline-none' type="password" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} placeholder="Confirm the password" />
            <textarea id="description" className='p-2 m-2 border-b-2 border-gray-300 hover:border-cyan-200' name="description" rows="4" cols="50" placeholder='Description' value={formData.description} onChange={handleChange}></textarea>
          </div>
          <button className='font-semibold bg-white p-2 text-cyan-300 border-2 border-cyan-300 rounded-md w-18 hover:bg-cyan-300 hover:text-white my-6' onClick={handleSubmit}>Signup</button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">Already have an account? <a href="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a></p>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
