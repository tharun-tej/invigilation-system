// Home.js

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96 text-center">
        <h2 className="text-2xl font-semibold mb-6">Welcome to Invigilation System</h2>
        <p className="text-gray-600 mb-4">
          Ensure a secure and efficient invigilation process with our system. Manage assignments,
          monitor exams, and streamline your invigilation workflow.
        </p>
        <ul className="list-disc ml-6 text-gray-600 mb-4">
          <li>Effortless assignment creation and management.</li>
          <li>Real-time monitoring of exam sessions.</li>
          <li>Generate detailed reports for analysis.</li>
        </ul>
        <p className="text-gray-600">
          Get started today and experience a new level of invigilation efficiency.
        </p>
        <Link to="/login">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none mt-4">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
