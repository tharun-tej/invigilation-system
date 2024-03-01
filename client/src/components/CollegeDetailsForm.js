// components/CollegeDetailsForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addOrUpdateCollegeDetailsRoute } from '../Utils/APIRoutes';

const CollegeDetailsForm = () => {
  const [totalStrength, setTotalStrength] = useState('');
  const [branches, setBranches] = useState('');
  const [rooms, setRooms] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(addOrUpdateCollegeDetailsRoute, {
        totalStrength,
        branches: branches.split(',').map(branch => branch.trim()),
        rooms : rooms.split(',').map(room => room.trim()) // Convert comma-separated branches into an array
      });
      console.log('College details added successfully:', response.data);

      toast.success('College details added successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });

      // Clear form fields after successful submission
      setTotalStrength('');
      setBranches('');
      setRooms('');
    } catch (error) {
      console.error('Error adding college details:', error);

      toast.error('Error adding college details. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    }
  };

  return (
    <div className="container mx-auto mt-8 p-8">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Enter College Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="totalStrength" className="block text-sm font-medium text-gray-700">
            Total College Strength
          </label>
          <input
            type="number"
            id="totalStrength"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            placeholder="Enter total strength"
            value={totalStrength}
            onChange={(e) => setTotalStrength(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="branches" className="block text-sm font-medium text-gray-700">
            Branches Available (comma-separated)
          </label>
          <input
            type="text"
            id="branches"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            placeholder="Enter branches"
            value={branches}
            onChange={(e) => setBranches(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="branches" className="block text-sm font-medium text-gray-700">
            Rooms Available (comma-separated)
          </label>
          <input
            type="text"
            id="branches"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            placeholder="Enter branches"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Add / Update
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default CollegeDetailsForm;
