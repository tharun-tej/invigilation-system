import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import ReactMultiDatePicker from "react-multi-date-picker";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { postExamDetailsRoute } from '../Utils/APIRoutes';
import FacultyAssigned from './FacultyAssigned';

const ExamRegistration = () => {
 const [year, setYear] = useState('');
 const [selectedDates, setSelectedDates] = useState([]);
 const [Timings, setTimings] = useState([]);
 const [submit, setSubmit] = useState(false);
 const handleChange = (dates) => {
    const updatedSelectedDates = dates.map(date => ({
      date: date.format('YYYY-MM-DD'),
      day: date.format('dddd')
    }));
    setSelectedDates(updatedSelectedDates);
 };

 const handleExamChange = (e, index) => {
    const value = e.target.value;
    const updatedExams = [...Timings];
    updatedExams[index] = value;
    setTimings(updatedExams);
 };

 const handleAddExam = () => {
    setTimings([...Timings, '']);
 };

 const handleRemoveExam = (index) => {
    const updatedExams = [...Timings];
    updatedExams.splice(index, 1);
    setTimings(updatedExams);
 };

 const handleExamRegistration = async () => {
    const isValidTimings = Timings.every(timing => {
      const match = timing.match(/^(\d)-(\d)$/);
      if (!match) return false;
      const [left, , right] = match;
      return parseInt(left, 10) <= 6 && parseInt(right, 10) <= 6 && parseInt(right, 10) > parseInt(left, 10);
    });

    if (!isValidTimings) {
      toast.error('Invalid exam timings. Please ensure each timing is in the format "X-Y" where X and Y are numbers less than 6, and Y is greater than X.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }
    const examDetails = {
      selectedDates,
      Timings,
      year,
    }
    console.log(examDetails);
    try {
      const response = await axios.post(postExamDetailsRoute, {
        selectedDates,
        year,
        Timings
      });
      console.log('Submitted exam details successfully!:', response.data);
  
      toast.success('Submitted exam details successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
  
      
      setTimings([]);
      setYear('');
      setSelectedDates([]);
      setSubmit(true);
    } catch (error) {
      console.error('Error submitting exam details:', error);
  
      toast.error('Error submitting exam details. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    }
 };

 if(!submit)
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
          {Timings.map((Exam, index) => (
            <div key={index} className="mb-4">
              <label className="block mb-1 font-semibold text-gray-700">Exam {index + 1}</label>
              <div className="flex items-center">
                <input
                 type="text"
                 className="border border-gray-300 rounded-md p-2 flex-grow"
                 placeholder="Enter Timings (Ex. 1-3)"
                 onChange={(e) => handleExamChange(e, index)}
                />
                <button
                 className="ml-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                 onClick={() => handleRemoveExam(index)}
                >
                 Remove
                </button>
              </div>
            </div>
          ))}

          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={handleAddExam}
          >
            Add Exam
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
          Submit
        </button>
      </div>
      <ToastContainer/>
    </div>
 );
 else
 return (
    <FacultyAssigned/>
  )
};

export default ExamRegistration;
