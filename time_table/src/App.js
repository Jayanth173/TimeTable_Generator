// src/App.jsx
import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Timetable from './pages/TimeTable/TimeTable';

const App = () => {
  const timetableRef = useRef();

  const handleRandomFill = (fillTimetableRandomly) => {
    timetableRef.current = fillTimetableRandomly;
  };

  const onRandomFill = () => {
    if (timetableRef.current) {
      timetableRef.current();
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar onRandomFill={onRandomFill} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timetable" element={<Timetable fillTimetable={handleRandomFill} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
