import React, { useState } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent'
import HomeContent from './HomeContent';
import { ForestFireContent } from './HomeContent';
import { Alert } from './Alert';
import { firealerts } from '../utils/config';

const MyForm = () => {
  const [submitMessage, setSubmitMessage] = useState('');
  const [formData, setFormData] = useState({
    day: '',
    month: '',
    year : '',
    Temperature : '',
    RH : '',
    Rain : ''
    // Add more form fields as needed
  });
//
    const getAlertData = (message) => {
    const msg = message;
    let index;
    if (msg == 'Forest is in danger') {
      index = 0;
    } else {
      index = 1;
    }
    return firealerts[index];
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <>
    <div className='bg-gray-800 flex'>
      <ForestFireContent />
        <div>
          <img className='mt-16 w-[450px] h-[300px] animate-pulse' src="https://images.unsplash.com/photo-1600181958051-bd8544360312?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" style={{ borderRadius : "50px" }}/>
        </div>
        </div>
      <form className='flex flex-col items-center m-10 p-4 shadow-lg'>
      <h1 className='content-center text-4xl text-cyan-400 mb-2'>Predict the Forestfires</h1>
        <div className="flex mb-6">
          <input className='p-2 m-2 border-b-2 border-gray-300 hover:border-cyan-200 focus:outline-none' type="text" name="day" placeholder='day' value={formData.day} onChange={handleChange} style={{ boxShadow: '0px 4px 4px -2px rgba(0, 0, 0, 0.1)' }} />
          <input className='p-2 m-2 border-b-2 border-gray hover:border-cyan-200 focus:outline-none' type="text" name="month" placeholder='Month' value={formData.month} onChange={handleChange} style={{ boxShadow: '0px 4px 4px -2px rgba(0, 0, 0, 0.1)' }} />
          <input className='p-2 m-2 border-b-2 border-gray hover:border-cyan-200 focus:outline-none' type="text" name="year" value={formData.year} placeholder='Year' onChange={handleChange} style={{ boxShadow: '0px 4px 4px -2px rgba(0, 0, 0, 0.1)' }}/>
        </div>
        <div className="flex mb-6">
          <input className='p-2 m-2 border-b-2 border-gray hover:border-cyan-200 focus:outline-none' type="text" name="Temperature" value={formData.Temperature} placeholder='Temperature' onChange={handleChange} style={{ boxShadow: '0px 4px 4px -2px rgba(0, 0, 0, 0.1)' }}/>
          <input className='p-2 m-2 border-b-2 border-gray hover:border-cyan-200 focus:outline-none' type="text" name="RH" value={formData.RH} placeholder='Humidity' onChange={handleChange} style={{ boxShadow: '0px 4px 4px -2px rgba(0, 0, 0, 0.1)' }}/>
          <input className='p-2 m-2 border-b-2 border-gray hover:border-cyan-200 focus:outline-none' type="text" name="Rain" value={formData.Rain} placeholder='Rain' onChange={handleChange} style={{ boxShadow: '0px 4px 4px -2px rgba(0, 0, 0, 0.1)' }}/>
        </div>
        <button className='font-semibold bg-white p-2 text-cyan-300 border-2 border-cyan-300 rounded-md w-18 hover:bg-cyan-300 hover:text-white my-6' onClick={async (e) => {
          e.preventDefault();
          try {
            const response = await axios.post('http://127.0.0.1:5000/predict', formData);
            setSubmitMessage(response.data.message);
          } catch (error) {
            console.error('Error:', error);
          }
    }} >Predict</button>
            <div className='m-2 p-2 text'>
          {submitMessage && (
            <>
              <h1 className='m-1 p-1 text-3xl text-gray-600'><span>{submitMessage}</span></h1>
              <div className='mt-4 ml-48'>
                {/* Pass props to Alert component based on submitMessage */}
                <Alert {...getAlertData(submitMessage)} />
              </div>
            </>
          )}
        </div>
  </form>
    </>
  );
};


const ForestFires = () => {
    return(
        <div>
          <MyForm />
          <div className='p-4 bg-gray-900'></div>
            <div>
              <MapComponent />
            </div>
        </div>
    );
}

export default ForestFires;