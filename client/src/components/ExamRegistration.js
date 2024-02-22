import React, { useState } from 'react';
import ReactMultiDatePicker from "react-multi-date-picker";

const ExamRegistration = () => {
  const [examTimings, setExamTimings] = useState('');
  const [year, setYear] = useState('');
  const [selectedDates, setSelectedDates] = useState([]);
  const [durations, setDurations] = useState([]);

  const handleChange = (dates) => {
    const updatedSelectedDates = dates.map(date => ({
      date: date.format('YYYY-MM-DD'),
      day: date.format('dddd')
    }));
    setSelectedDates(updatedSelectedDates);
    console.log('invoked :  ')
console.log(selectedDates)
  };

  const handleDurationChange = (e, index) => {
    const updatedDurations = [...durations];
    updatedDurations[index] = e.target.value;
    setDurations(updatedDurations);
  };

  const handleAddDuration = () => {
    setDurations([...durations, '']);
  };

  const handleRemoveDuration = (index) => {
    const updatedDurations = [...durations];
    updatedDurations.splice(index, 1);
    setDurations(updatedDurations);
  };

  const handleExamRegistration = () => {
    console.log('Selected Dates:', selectedDates);
    console.log('Exam Timings:', examTimings);
    console.log('Year:', year);
    console.log('Durations:', durations);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Exam Registration</h1>

        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">Select Dates:</label>
          <ReactMultiDatePicker
            className="react-multi-date-picker border border-gray-300 rounded-md p-2"
            value={selectedDates.map(dateObj => dateObj.date.toString())}
            onChange={handleChange}
            multiple
          />
        </div>

        <div className="mb-6">
          <label htmlFor="examTimings" className="block mb-2 font-semibold text-gray-700">Exam Timings:</label>
          {durations.map((duration, index) => (
            <div key={index} className="mb-4">
              <label className="block mb-1 font-semibold text-gray-700">Duration {index + 1}</label>
              <div className="flex items-center">
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 flex-grow"
                  placeholder="Enter duration"
                  value={duration}
                  onChange={(e) => handleDurationChange(e, index)}
                />
                <button
                  className="ml-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                  onClick={() => handleRemoveDuration(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={handleAddDuration}
          >
            Add Duration
          </button>
        </div>

        <div className="mb-6">
          <label htmlFor="year" className="block mb-2 font-semibold text-gray-700">Year:</label>
          <select
            id="year"
            className="border border-gray-300 rounded-md p-2 w-full"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">Select year</option>
            {[1, 2, 3, 4].map((yearOption) => (
              <option key={yearOption} value={yearOption}>
                {yearOption}
              </option>
            ))}
          </select>
        </div>

        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
          onClick={handleExamRegistration}
        >
          Register Exam
        </button>
      </div>
    </div>
  );
};

export default ExamRegistration;
