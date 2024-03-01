import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const isLoggedIn = localStorage.getItem('user') !== null;

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96 text-center">
        <h2 className="text-2xl font-semibold mb-6">Welcome to Invigilation Assignment System</h2>
        <p className="text-gray-600 mb-4">
          Ensure a secure and efficient invigilation process with our system. Manage assignments,
          monitor exams, and streamline your invigilation workflow.
        </p>
        <ul className="text-left text-gray-600 mb-4 ml-4">
          <li>Effortless assignment creation and management.</li>
          
        </ul>
        <p className="text-gray-600">
          Get started today and experience a new level of invigilation efficiency.
        </p>

        {isLoggedIn ? (
          <>
            <Link to="/CollegeDetails">
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none mt-4 mr-2">
                College Details
              </button>
            </Link>
            <Link to="/add-faculty">
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none mt-4 mr-2">
                Add Faculty
              </button>
            </Link>
            <Link to="/registerExam">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none mt-4 mr-2">
                Assign Invigilators
              </button>
            </Link>
            <Link to="/facultyDetails">
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none mt-4 mr-2">
                Faculty Details
              </button>
            </Link>
          </>
        ) : (
          <Link to="/login">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none mt-4">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
