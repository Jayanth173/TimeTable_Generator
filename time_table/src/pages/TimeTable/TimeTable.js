// src/pages/TimeTable/TimeTable.jsx
import React, { useState, useEffect } from 'react';
import './TimeTable.css'; // Example CSS file for styling

const Timetable = ({ fillTimetable }) => {
  const [timetableData, setTimetableData] = useState([]);

  // Example data structure
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const periods = ['1', '2', '3', '4', '5', '6', '7', '8'];

  // Function to initialize or load timetable data from local storage
  useEffect(() => {
    const storedSubjects = JSON.parse(localStorage.getItem('subjects')) || [];
    setTimetableData(storedSubjects);
  }, []);

  // Function to handle changes in timetable data
  const handleTimetableChange = (day, period, newValue) => {
    const updatedTimetable = [...timetableData];
    const cellToUpdate = updatedTimetable.find(cell => cell.day === day && cell.periodNumber === period);

    if (cellToUpdate) {
      cellToUpdate.subjectName = newValue;
    } else {
      updatedTimetable.push({ day, periodNumber: period, subjectName: newValue });
    }

    setTimetableData(updatedTimetable);
    localStorage.setItem('subjects', JSON.stringify(updatedTimetable));
  };

  // Function to fill the timetable randomly
  const fillTimetableRandomly = () => {
    const subjects = [
      { name: 'Tamil', count: 7 },
      { name: 'Maths', count: 7 },
      { name: 'Science', count: 7 },
      { name: 'Social', count: 6 },
      { name: 'English', count: 7 },
      { name: 'PET', count: 2 },
      { name: 'EC', count: 2 },
      { name: 'CC', count: 2 },
      { name: 'Drawing', count: 1 },
    ];

    const totalPeriods = days.length * periods.length;
    const allPeriods = [];

    subjects.forEach(subject => {
      for (let i = 0; i < subject.count; i++) {
        allPeriods.push(subject.name);
      }
    });

    while (allPeriods.length < totalPeriods) {
      allPeriods.push('Free');
    }

    shuffleArray(allPeriods);

    const newTimetableData = [];
    days.forEach(day => {
      periods.forEach((period, index) => {
        const subjectName = allPeriods.pop();
        newTimetableData.push({ day, periodNumber: period, subjectName });
      });
    });

    setTimetableData(newTimetableData);
    localStorage.setItem('subjects', JSON.stringify(newTimetableData));
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  useEffect(() => {
    if (fillTimetable) {
      fillTimetable(fillTimetableRandomly);
    }
  }, [fillTimetable]);

  // Function to handle deleting timetable data
  const handleDeleteTimetable = () => {
    setTimetableData([]);
    localStorage.removeItem('subjects');
  };

  return (
    <div className="timetable-page">
      <button onClick={handleDeleteTimetable} className="delete-button">Delete Timetable</button>
      <table className="timetable">
        <thead>
          <tr>
            <th className="empty-cell"></th> {/* Empty corner */}
            {periods.map(period => (
              <th key={period} className="period-header">{period}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map(day => (
            <tr key={day}>
              <td className='day-cell'>{day}</td> {/* Day name */}
              {periods.map(period => (
                <td key={`${day}-${period}`} className="timetable-cell">
                  <p className="subject-name">
                    {timetableData.find(cell => cell.day === day && cell.periodNumber === period)?.subjectName || ''}
                  </p>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;
