// src/components/SpecialtySelector.jsx
import React from 'react';
import './SpecialtySelector.css';

const specialties = [
  { label: 'All', icon: '🌐' },
  { label: 'Dermatologist', icon: '🧴' },
  { label: 'Dentist', icon: '🦷' },
  { label: 'Psychiatrist', icon: '🧠' },
  { label: 'Eye Specialist', icon: '👁️' },
  { label: 'General Physician', icon: '🩺' },
  { label: 'Cardiologist', icon: '❤️' },
  { label: 'Pediatrician', icon: '👶' },
];

function SpecialtySelector({ selected, onSelect }) {
  return (
    <div className="specialty-scroll">
      {specialties.map((s, i) => (
        <div
          key={i}
          className={`specialty-pill ${selected === s.label ? 'selected' : ''}`}
          onClick={() => onSelect(s.label)}
        >
          <span className="icon">{s.icon}</span>
          <span className="label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

export default SpecialtySelector;
