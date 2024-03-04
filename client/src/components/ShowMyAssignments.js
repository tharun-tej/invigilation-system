import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowMyAssignments = () => {
  const [assignedInvigilators, setAssignedInvigilators] = useState([]);

  useEffect(() => {
    // Fetch assigned invigilators for the logged-in user
    const fetchAssignedInvigilators = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.email) {
        try {
          const response = await axios.get(getAssignmentDetailsRoute, {
            params: { email: user.email }
          });
          setAssignedInvigilators(response.data.details.assignedInvigilators);
        } catch (error) {
          console.error('Error fetching assigned invigilators:', error);
        }
      }
    };

    fetchAssignedInvigilators();
  }, []);

  return (
    <div>
      <h2>My Assignments</h2>
      <div>
        {assignedInvigilators.map((assignment, index) => (
          <div key={index}>
            <p>Date: {assignment.date}</p>
            <p>Day: {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][assignment.day]}</p>
            <p>Timing: {assignment.timing}</p>
            <p>Invigilators:</p>
            <ul>
              {assignment.invigilators.map((invigilator, i) => (
                <li key={i}>{invigilator}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowMyAssignments;
