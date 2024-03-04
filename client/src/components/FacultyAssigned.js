import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCFacultyDetailsRoute, getCollegeDetailsRoute, getExamDetailsRoute, postAssignmentDetailsRoute } from '../Utils/APIRoutes';

const FacultyAssigned = () => {
  const [facultyQueue, setFacultyQueue] = useState([]);
  const [collegeDetails, setCollegeDetails] = useState({});
  const [assignedInvigilators, setAssignedInvigilators] = useState([]);
  const [examDetails, setExamDetails] = useState({});

  useEffect(() => {
    const fetchFacultyDetails = async () => {
      try {
        const response = await axios.get(getCFacultyDetailsRoute);
        setFacultyQueue(response.data.facultyDetails);
      } catch (error) {
        console.error('Error fetching faculty details:', error);
      }
    };

    const fetchCollegeDetails = async () => {
      try {
        const response = await axios.get(getCollegeDetailsRoute);
        setCollegeDetails(response.data.collegeDetails);
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
    day = parseInt(day);
    const [startHour, endHour] = timing.split('-').map(Number);
    if (!faculty.timetable) return false;
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
    const assignedFaculty = {}; // Object to track assigned faculty for each timing
  
    // Initialize assignedFaculty object
    examDetails.selectedDates.forEach((dateObj) => {
      examDetails.Timings.forEach((timing) => {
        assignedFaculty[`${dateObj.date}-${timing}`] = new Set();
      });
    });
  
    facultyQueue.forEach((faculty) => {
      faculty.count = 0;
    });
  
    examDetails.selectedDates.forEach((dateObj) => {
      examDetails.Timings.forEach((timing) => {
        const roomInvigilators = []; // Array to store assigned invigilators for the current room
  
        // Loop through each room
        collegeDetails.branches.forEach((branch) => {
          const invigilators = [];
          let invigilatorCount = 0;
  
          // Loop through faculty queue
          facultyQueue.forEach((faculty) => {
            const key = `${faculty.email}-${dateObj.date}-${timing}`;
            if (
              invigilatorCount < 2 &&
              !assignedFaculty[`${dateObj.date}-${timing}`].has(faculty.email) && // Check if faculty not already assigned
              isFacultyAvailable(faculty, convertDayToNumber(dateObj.day), timing)
            ) {
              invigilators.push(`${faculty.salutation} ${faculty.name}`);
              invigilatorCount++;
              faculty.count++;
              assignedFaculty[`${dateObj.date}-${timing}`].add(faculty.email); // Mark faculty as assigned
            }
          });
  
          // If no invigilators available, add placeholder
          if (invigilatorCount === 0) {
            invigilators.push('No Invigilator');
          }
  
          // Add invigilators for the current room
          roomInvigilators.push(invigilators.join('<br/>'));
        });
  
        // Sort the faculty queue based on the count attribute
        facultyQueue.sort((a, b) => a.count - b.count);
  
        updatedAssignedInvigilators.push({
          date: dateObj.date,
          day: convertDayToNumber(dateObj.day),
          timing,
          invigilators: roomInvigilators,
        });
      });
    });
  
    setAssignedInvigilators(updatedAssignedInvigilators);  
    console.log(updatedAssignedInvigilators);
  };
  

  useEffect(() => {
    if (facultyQueue.length > 0 && Object.keys(collegeDetails).length > 0 && Object.keys(examDetails).length > 0) {
      assignInvigilators();
    }
  }, [facultyQueue, collegeDetails, examDetails, collegeDetails.rooms]);

  const convertDayToNumber = (day) => {
    switch (day) {
      case 'Monday':
        return 0;
      case 'Tuesday':
        return 1;
      case 'Wednesday':
        return 2;
      case 'Thursday':
        return 3;
      case 'Friday':
        return 4;
      case 'Saturday':
        return 5;
      case 'Sunday':
        return 6;
      default:
        return -1; // Error case
    }
  };
  const formatTiming = (timing) => {
     const timings = {
      '1': '9:00 - 10:00',
      '2': '10:00 - 11:00',
      '3': '11:10 - 12:10',
      '4': '12:10 - 1:10',
      '5': '1:55 - 2:45',
      '6': '2:55 - 3:45',
     };
    
     const [startHour, endHour] = timing.split('-').map(Number);
     return timings[startHour].split('-')[0] + '-' + timings[endHour].split('-')[1] ;
    };
    const submitAssignment = async (e)=>{
      try{

        const response = await axios.post(postAssignmentDetailsRoute,{
          assignedInvigilators
        })
      }  
     catch (error) {
        console.error('Error fetching faculty details:', error);
      }

    }
  return (
    <div className="flex justify-center items-center">
      <div className="overflow-x-auto w-full">
        {assignedInvigilators.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xl font-bold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                {collegeDetails.rooms.map((roomNumber, index) => (
                  <th key={index} className="px-6 py-3 bg-gray-50 text-left text-xl font-bold text-gray-500 uppercase tracking-wider">
                    Room {roomNumber}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {assignedInvigilators.map((assignedInvigilator, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-no-wrap border border-gray-200">
                    <div className="text-lg font-bold">{assignedInvigilator.date}</div>
                    <div className="text-lg font-bold">{(["Mon","Tue","Wed","Thurs","Fri","Sat"])[assignedInvigilator.day]}</div>
                    <div className="text-lg font-bold">( {formatTiming(assignedInvigilator.timing)} )</div>
                  </td>
                  {assignedInvigilator.invigilators.map((invigilators, roomIndex) => (
                    <td key={roomIndex} className="px-6 py-4 whitespace-no-wrap border border-gray-200">
                      <div className="text-lg" dangerouslySetInnerHTML={{ __html: invigilators }} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="flex flex-col text-lg font-bold">Computing...</p>
        )}
      </div>
      <button onClick={submitAssignment}>Submit</button>
    </div>
  );
};

export default FacultyAssigned;
