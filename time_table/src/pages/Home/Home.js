// src/Home.jsx
import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [subjects, setSubjects] = useState(() => {
    const storedSubjects = localStorage.getItem('subjects');
    return storedSubjects ? JSON.parse(storedSubjects) : [];
  });
  const [subjectName, setSubjectName] = useState('');
  const [periodNumber, setPeriodNumber] = useState('');
  const [day, setDay] = useState('');

  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }, [subjects]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSubject = { subjectName, periodNumber, day };
    setSubjects([...subjects, newSubject]);
    setSubjectName('');
    setPeriodNumber('');
    setDay('');
  };

  const handleDelete = (index) => {
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects);
  };

  const handleEdit = (index) => {
    const subjectToEdit = subjects[index];
    setSubjectName(subjectToEdit.subjectName);
    setPeriodNumber(subjectToEdit.periodNumber);
    setDay(subjectToEdit.day);
    handleDelete(index);
  };

  return (
    <div className="home">
      <div className="form-card">
        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Subject Name"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            required
          />
           <input
            type="text"
            placeholder="Day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Period Number"
            value={periodNumber}
            onChange={(e) => setPeriodNumber(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <ul className="subject-list">
        {subjects.map((subject, index) => (
          <li key={index}>
            <div className="subject-details">
              {subject.subjectName}  Period: {subject.periodNumber}  Day: {subject.day}
            </div>
            <div className="subject-buttons">
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)} className='del'>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
