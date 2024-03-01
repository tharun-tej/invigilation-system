import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import ExamRegistration from './components/ExamRegistration';
import AddFaculty from './components/AddFaculty';
import FacultyAssigned from './components/FacultyAssigned';
import FacultyDetails from './components/FacultyDetails';
import CollegeDetailsForm from './components/CollegeDetailsForm';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home/>} />
          <Route path="/registerExam" element={<ExamRegistration/>} />
          <Route path="/add-faculty" element={<AddFaculty/>} />
          <Route path="/facultyDetails" element={<FacultyDetails/>} />
          <Route path="/facultyAssigned" element={<FacultyAssigned/>} />
          <Route path="/CollegeDetails" element={<CollegeDetailsForm/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
