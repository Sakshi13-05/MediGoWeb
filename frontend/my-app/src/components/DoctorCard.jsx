// src/components/DoctorCard.jsx
import React from 'react';
import './DoctorCard.css';

function DoctorCard({ doctor, onConsultClick }) {
  return (
    <div className="doctor-card">
      <img src={doctor.image} alt={doctor.name} className="doctor-img" />
      <div className="doctor-info">
        <h3>{doctor.name}</h3>
        <p className="specialty">{doctor.specialty}</p>
        <p className="rating">⭐ {doctor.rating}</p>
        <button className="consult-btn" onClick={onConsultClick}>
          Consult Now
        </button>
      </div>
    </div>
  );
}

export default DoctorCard;
