// src/components/Navbar/Navbar.jsx
import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import img from '../../assert/timetlogo.png'

const Navbar = ({ onRandomFill }) => {
  const handleDownload = async () => {
    const timetableElement = document.querySelector('.timetable-page');
    const doc = new jsPDF();
    doc.autoTable({
      html: timetableElement.querySelector('table'),
      startY: 10,
      theme: 'grid',
      headStyles: { fillColor: [192, 192, 192] }, // Change header color to gray
      bodyStyles: { fillColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });
    doc.save('timetable.pdf');
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img className ='logot' src={img}/>
      </div>
      <div className="nav-buttons">
        <Link to="/"><button>Home</button></Link>
        <Link to="/timetable"><button>Timetable</button></Link>
        <button onClick={handleDownload}>Download</button>
        <button onClick={onRandomFill}>Random</button>
      </div>
    </nav>
  );
};

export default Navbar;
