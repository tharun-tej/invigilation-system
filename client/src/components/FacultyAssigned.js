import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCFacultyDetailsRoute, getCollegeDetailsRoute, getExamDetailsRoute } from '../Utils/APIRoutes';

const FacultyAssigned = () => {
  const [facultyQueue, setFacultyQueue] = useState([]);
  const [collegeDetails, setCollegeDetails] = useState({});
  const [assignedInvigilators, setAssignedInvigilators] = useState([]);
  const [examDetails, setExamDetails] = useState({});

  useEffect(() => {
    const fetchFacultyDetails = async () => {
      try {
        const response = await axios.get(getCFacultyDetailsRoute);
        setFacultyQueue(response.data.details);
      } catch (error) {
        console.error('Error fetching faculty details:', error);
      }
    };

    const fetchCollegeDetails = async () => {
      try {
        const response = await axios.get(getCollegeDetailsRoute);
        setCollegeDetails(response.data);
      } catch (error) {
        console.error('Error fetching college details:', error);
      }
    };

    const fetchExamDetails = async () => {
      try {
        const response = await axios.get(getExamDetailsRoute);
        setExamDetails(response.data);
      } catch (error) {
        console.error('Error fetching exam details:', error);
      }
    };

    fetchFacultyDetails();
    fetchCollegeDetails();
    fetchExamDetails();
  }, []);

  const isFacultyAvailable = (faculty, day, timing) => {
    const [startHour, endHour] = timing.split('-').map(Number);
    const facultySchedule = faculty.timetable.schedule[day];
    for (let hour = startHour; hour <= endHour; hour++) {
      const slot = facultySchedule[hour - 1];
      if (slot.branch !== '' && examDetails.year !== slot.year) {
        return false;
      }
    }
    return true;
  };

  const assignInvigilators = () => {
    const updatedAssignedInvigilators = []; // Array to store assigned invigilators for each room and timing

    // Calculate the number of rooms based on the total strength
    const numRooms = Math.ceil(collegeDetails.totalStrength / 4);

    // Loop through each exam date and timing
    examDetails.selectedDates.forEach((dateObj) => {
      examDetails.Timings.forEach((timing) => {
        const roomInvigilators = []; // Array to store assigned invigilators for the current room

        // Loop through the faculty queue
        facultyQueue.forEach((faculty) => {
          // Check if the faculty is available for the current day and timing
          if (isFacultyAvailable(faculty, dateObj.day, timing)) {
            roomInvigilators.push(`${faculty.salutation} ${faculty.name}`); // Add the invigilator to the room
            faculty.count++; // Increment the count attribute for the assigned faculty
          }
        });

        // Sort the faculty queue based on the count attribute
        facultyQueue.sort((a, b) => a.count - b.count);

        updatedAssignedInvigilators.push({
          date: dateObj.date,
          day: dateObj.day,
          timing,
          invigilators: roomInvigilators,
        });
      });
    });

    setAssignedInvigilators(updatedAssignedInvigilators);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (facultyQueue.length > 0 && Object.keys(collegeDetails).length > 0 && Object.keys(examDetails).length > 0) {
      assignInvigilators();
    }
  }, [facultyQueue, collegeDetails, examDetails]);

  return (
    <div className="flex justify-center items-center">
      <div className="overflow-x-auto w-full">
        {assignedInvigilators.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Date\Room
                </th>
                {assignedInvigilators[0].invigilators.map((invigilator, index) => (
                  <th key={index} className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    {invigilator}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {assignedInvigilators.map((assignedInvigilator, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-no-wrap border border-gray-200">
                    {assignedInvigilator.date} ({assignedInvigilator.day})
                  </td>
                  {assignedInvigilator.invigilators.map((invigilator, index) => (
                    <td key={index} className="px-6 py-4 whitespace-no-wrap border border-gray-200">
                      {invigilator}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Computing...</p>
        )}
      </div>
    </div>
  );
};

export default FacultyAssigned;
