import React, { useState } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';
import { EarthQuakeContent } from './HomeContent';
import { Alert } from './Alert';
import { eqalerts } from '../utils/config';

const MyForm = () => {
  const [submitMessage, setSubmitMessage] = useState('');
  const [formData, setFormData] = useState({
    tsunami: '',
    mmi: '',
    sig: '',
    depth: '',
    nst: '',
    longitude: ''
    // Add more form fields as needed
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to get the appropriate alert data based on submitMessage value
  const getAlertData = (message) => {
    const value = parseFloat(message);
    let index;
    if (value >= 0 && value < 2) {
      index = 0;
    } else if (value >= 2 && value < 3) {
      index = 1;
    } else if (value >= 3 && value < 4) {
      index = 2;
    } else if (value >= 4 && value < 6) {
      index = 3;
    } else if (value >= 6 && value < 8) {
      index = 4;
    } else if (value >= 8 && value < 10) {
      index = 5;
    }
    return eqalerts[index];
  };
  

  return (
    <>
      <div className='bg-gray-800 flex'>
        <EarthQuakeContent />
        <div>
          <img className='mt-14 mr-5 w-[400px] h-[250px] animate-pulse' src="https://images.unsplash.com/photo-1601931163309-fe9459564c03?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" style={{ borderRadius: "50px" }} />
        </div>
      </div>
      <form className='flex flex-col items-center m-10 p-4 shadow-lg'>
        <h1 className='content-center text-4xl text-cyan-400 mb-3'>EarthQuake Prediction</h1>
        <div className="flex mb-6">
          <input className='p-2 m-2 border-b-2 border-gray-300 hover:border-cyan-200 focus:outline-none' type="text" name="tsunami" placeholder='Tsunami Occurred' value={formData.tsunami} onChange={handleChange} style={{ boxShadow: '0px 4px 4px -2px rgba(0, 0, 0, 0.1)' }} />
          <input className='p-2 m-2 border-b-2 border-gray hover:border-cyan-200 focus:outline-none' type="text" name="mmi" placeholder='Mercalli Intensity (MMI)' placeholderClassName='text-sm' value={formData.mmi} onChange={handleChange} style={{ boxShadow: '0px 4px 4px -2px rgba(0, 0, 0, 0.1)' }} />
          <input className='p-2 m-2 border-b-2 border-gray hover:border-cyan-200 focus:outline-none' type="text" name="sig" placeholder='Significance Level (SIG)' value={formData.sig} onChange={handleChange} style={{ boxShadow: '0px 4px 4px -2px rgba(0, 0, 0, 0.1)' }} />
        </div>
        <div className="flex mb-6">
          <input className='p-2 m-2 border-b-2 border-gray hover:border-cyan-200 focus:outline-none' type="text" name="depth" placeholder='Depth' value={formData.depth} onChange={handleChange} style={{ boxShadow: '0px 4px 4px -2px rgba(0, 0, 0, 0.1)' }} />
          <input className='p-2 m-2 border-b-2 border-gray hover:border-cyan-200 focus:outline-none' type="text" name="nst" placeholder='NST' value={formData.nst} onChange={handleChange} style={{ boxShadow: '0px 4px 4px -2px rgba(0, 0, 0, 0.1)' }} />
          <input className='p-2 m-2 border-b-2 border-gray hover:border-cyan-200 focus:outline-none' type="text" name="longitude" placeholder='Longitude' value={formData.longitude} onChange={handleChange} style={{ boxShadow: '0px 4px 4px -2px rgba(0, 0, 0, 0.1)' }} />
        </div>
        <button className='font-semibold bg-white p-2 text-cyan-300 border-2 border-cyan-300 rounded-md w-18 hover:bg-cyan-300 hover:text-white my-6' onClick={async (e) => {
          e.preventDefault();
          try {
            const response = await axios.post('http://127.0.0.1:5000/eqpredict', formData);
            setSubmitMessage(response.data.message);
          } catch (error) {
            console.error('Error:', error);
          }
        }}>Predict</button>
        <div className='m-2 p-2 text'>
          {submitMessage && (
            <>
              <h1 className='m-1 p-1 text-3xl text-gray-600'>Magnitude of the EarthQuake is <span className='text-black'>{submitMessage}</span></h1>
              <div className='mt-4 ml-48'>
                {/* Pass props to Alert component based on submitMessage */}
                <Alert {...getAlertData(submitMessage)} />
              </div>
            </>
          )}
        </div>
      </form>
      <div className='m-9'>
        At present, there is no warning before earthquake onset, but early warning available in a few seconds after the determination of earthquake parameters that has happened.
      </div>
    </>
  );
};

const EarthQuakes = () => {
  return (
    <div>
      <MyForm />
      <div>
        <MapComponent />
      </div>
    </div>
  );
}

export default EarthQuakes;
