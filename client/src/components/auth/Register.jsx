// RegisterForm.js

import React, { useState } from 'react';
import { registerUser } from '../../services/api';
// import { useHistory as navigate } from 'react-router-dom';
import {Navigate} from 'react-router-dom';


const Register = function () {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    picture: null, // Assuming 'picture' is the name of the file field
  });
  const [loading, setLoading] = useState(false); // For managing loading state
  const [error, setError] = useState(null); // For managing error state
  const [registered, setRegistered] = useState(false); // For managing error state
  const handleRegister = async () => {
    try {
      setLoading(true);
      const res = await registerUser(formData);
      if (res.status === 200) {
        console.log('Registration successful!');
        setError(null);
        setRegistered(true);
        // Optionally log user in after registering
        // await loginUser(formData);
        // Redirect to home page after registering
      }
      else{
        console.log(res.data)
        setError(res.data)
      }
      // Optionally, redirect or show a success message to the user
    } catch (error) {
      console.error('Registration error:', error);
      // Handle registration error, e.g., display an error message
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    // For file input, use e.target.files to get the selected file(s)
    if (e.target.type === 'file') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
    {registered && <Navigate to='/Login' />}
    <div className="flex flex-col max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <div className='grid grid-cols-2 gap-4'>
      <input
        type="text"
        name="firstName"
        placeholder="First name"
        value={formData.firstName}
        onChange={handleChange}
        className="w-full mb-4 p-2 border border-gray-300 rounded focus:border-blue-400 focus:outline-none"
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last name"
        value={formData.lastName}
        onChange={handleChange}
        className="w-full mb-4 p-2 border border-gray-300 rounded focus:border-blue-400 focus:outline-none"
      />
      
      </div>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full mb-4 p-2 border border-gray-300 rounded focus:border-blue-400 focus:outline-none"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full mb-4 p-2 border border-gray-300 rounded focus:border-blue-400 focus:outline-none"
      />
      <input
        type="file"
        name="picture"
        accept="image/*"
        onChange={handleChange}
        className="w-full mb-4 p-2 border border-gray-300 rounded focus:border-blue-400 focus:outline-none"
      />
      <button
        onClick={handleRegister}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
      {error && <p className="text-red-500 m-auto mt-4">{error}</p>}
    </div>
    </>
  )}

export default Register;
