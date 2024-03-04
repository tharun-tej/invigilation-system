import React, { useState } from 'react';
import axios from 'axios';
import { addFacultyRoute } from '../Utils/APIRoutes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddFaculty = () => {
  const [facultyDetails, setFacultyDetails] = useState({
    salutation: '',
    name: '',
    id: '',
    email: '',
    password: '',
    timetable: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacultyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      facultyDetails.timetable = JSON.parse(facultyDetails.timetable)
      const response = await axios.post(addFacultyRoute, facultyDetails);
      console.error(' adding faculty:',facultyDetails );
      console.log('Faculty added successfully:', response.data);
     toast.success('Faculty added successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });

      setFacultyDetails({
        salutation: '',
        name: '',
        id: '',
        email: '',
        password: '',
        timetable: '',
      });
    } catch (error) {
      console.error('Error adding faculty:', error);

      toast.error('Error adding faculty. Please try again.', {
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
      <h1 className="text-2xl font-bold mb-4">Add Faculty</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="salutation" className="block text-sm font-medium text-gray-700">
            Salutation
          </label>
          <select
            id="salutation"
            name="salutation"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={facultyDetails.salutation}
            onChange={handleChange}
          >
            <option value="">Select salutation</option>
            <option value="Mr.">Mr.</option>
            <option value="Ms.">Ms.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Dr.">Dr.</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            placeholder="Enter name"
            value={facultyDetails.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="id" className="block text-sm font-medium text-gray-700">
            ID
          </label>
          <input
            type="text"
            id="id"
            name="id"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            placeholder="Enter ID"
            value={facultyDetails.id}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            placeholder="Enter email"
            value={facultyDetails.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            placeholder="Enter password"
            value={facultyDetails.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="timetable" className="block text-sm font-medium text-gray-700">
            Timetable (JSON format)
          </label>
          <textarea
            id="timetable"
            name="timetable"
            rows="5"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            placeholder="Enter timetable in JSON format"
            value={facultyDetails.timetable}
            defaultValue='{
              "years": [1, 2],
              "schedule": [
                [
                  {"branch": "CSE", "year": "2"},
                  {"branch": "MECH", "year": "3"},
                  {"branch": "", "year": ""},
                  {"branch": "", "year": ""},
                  {"branch": "", "year": ""},
                  {"branch": "", "year": ""}
                ],
                [
                  {"branch": "", "year": ""},
                  {"branch": "", "year": ""},
                  {"branch": "", "year": ""},
                  {"branch": "", "year": ""},
                  {"branch": "", "year": ""},
                  {"branch": "", "year": ""}
                ],
                [
                  {"branch": "", "year": ""},
                  {"branch": "", "year": ""},
                  {"branch": "", "year": ""},
                  {"branch": "", "year": ""},
                  {"branch": "", "year": ""},
                  {"branch": "", "year": ""}
                ],
                [
                  {"branch": "", "year": ""},
                  {"branch": "", "year": ""},
                  {"branch": "", "year": ""},
                  {"branch": "", "year": ""},
                  {"branch": "", "year": ""},
                  {"branch": "", "year": ""}
                ],
                [
                  {"branch": "", "year": ""},
                  {"branch": "", "year": ""},
                  {"branch": "", "year": ""},
                  {"branch": "", "year": ""},
                  {"branch": "", "year": ""},
                  {"branch": "", "year": ""}
                ],
                [
                  {"branch": "", "year": ""},
                  {"branch": "", "year": ""},
                  {"branch": "", "year": ""},
                  {"branch": "", "year": ""},
                  {"branch": "", "year": ""},
                  {"branch": "", "year": ""}
                ]
              ]
            }
            '
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Add/Update Faculty Details
        </button>
      </form>
    </div>
  );
};

export default AddFaculty;
