// ExamRegistration.js
import React, { useState } from 'react';
import ReactMultiDatePicker from "react-multi-date-picker";

const ExamRegistration = () => {
  const [examTimings, setExamTimings] = useState('');
  const [year, setYear] = useState('');
  const [selectedDates, setSelectedDates] = useState([]);

  const handleChange = (dates) => {
    // Extract days from selected dates and create an array of objects
    const updatedSelectedDates = dates.map(date => ({
      date: date.format('YYYY-MM-DD'),
      day: date.format('dddd')
    }));

    setSelectedDates(updatedSelectedDates);
    console.log(updatedSelectedDates);
  };

  const handleExamRegistration = () => {
    // Add logic to handle exam registration, e.g., send data to the backend
    console.log('Selected Dates:', selectedDates);
    
    console.log('Exam Timings:', examTimings);
    console.log('Year:', year);
    // Additional logic as needed
  };

  return (
    <div className="container mx-auto mt-8 p-8">
      <h1 className="text-2xl font-bold mb-4">Exam Registration</h1>
      
      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700">Select Dates:</label>
        <ReactMultiDatePicker
          className="react-multi-date-picker"
          value={selectedDates.map(dateObj => dateObj.date)}
          onSelect={handleChange}
          multiple
        />
      </div>


      <div className="mb-4">
        <label htmlFor="examTimings" className="block text-sm font-medium text-gray-700">
          Exam Timings
        </label>
        <input
          type="text"
          id="examTimings"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          placeholder="Enter exam timings"
          value={examTimings}
          onChange={(e) => setExamTimings(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="year" className="block text-sm font-medium text-gray-700">
          Year
        </label>
        <input
          type="text"
          id="year"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          placeholder="Enter year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>

      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        onClick={handleExamRegistration}
      >
        Register Exam
      </button>
    </div>
  );
};

export default ExamRegistration;
