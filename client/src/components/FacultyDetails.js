import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { facultyDetailsRoute } from '../Utils/APIRoutes';

const FacultyDetails = () => {
  const [facultyDetails, setFacultyDetails] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(facultyDetailsRoute);
        setFacultyDetails(response.data.details);
      } catch (error) {
        console.error('Error fetching faculty details:', error);
      }
    };

    fetchData();
  }, []);
  
  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Text copied to clipboard!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  };

  return (
    <div className="container mx-auto mt-8 p-8">
      <h1 className="text-2xl font-bold mb-4">Faculty Details</h1>

      <table className="table-auto border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">Name</th>
          <th className="border border-gray-300px-4 py-2">ID</th>
          <th className="border border-gray-300px-4 py-2">Email</th>
          <th className="border border-gray-300px-4 py-2">Password</th>
        </tr>
      </thead>
      <tbody>
        {facultyDetails.map((faculty, index) => (
          <tr key={index}>
            <td
              className="border border-gray-300 px-4 py-2 cursor-pointer hover:text-blue-500"
              onClick={() => handleCopyText(`${faculty.salutation} ${faculty.name}`)}
            >
              {faculty.salutation} {faculty.name}
              <span className="hidden">Copy</span> 
            </td>
            <td
              className="border border-gray-300 px-4 py-2 cursor-pointer hover:text-blue-500"
              onClick={() => handleCopyText(faculty.id)}
            >
              {faculty.id}
              <span className="hidden">Copy</span>
            </td>
            <td
              className="border border-gray-300 px-4 py-2 cursor-pointer hover:text-blue-500"
              onClick={() => handleCopyText(faculty.email)}
            >
              {faculty.email}
              <span className="hidden">Copy</span> 
            </td>
            <td
              className="border border-gray-300 px-4 py-2 cursor-pointer hover:text-blue-500"
              onClick={() => handleCopyText(faculty.email)}
            >
              {faculty.password}
              <span className="hidden">Copy</span> 
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <ToastContainer/>
    </div>
  );
};

export default FacultyDetails;
