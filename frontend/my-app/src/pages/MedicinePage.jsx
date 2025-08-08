import React, { useState, useEffect } from 'react';
import './Medicine.css';
import HealthSection from '../components/HealthSection';
import MedicineList from '../components/MedicineList';

function MedicinePage() {
  const hints = ["Paracetamol", "Dolo 650", "ORS Solution", "Crocin", "Combiflam"];

  const [index, setIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % hints.length);
        setFade(true);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="medicine-page">
      {/* Search Bar */}
      <div className="search-wrapper">
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="real-input"
            placeholder=""
          />
          {inputValue === '' && (
            <div className={`custom-placeholder ${fade ? 'fade-in' : 'fade-out'}`}>
              What are you looking for? <span className="try-text">Try <strong>{hints[index]}</strong></span>
            </div>
          )}
        </div>
      </div>

      {/* Carousel */}
      <HealthSection />

      {/* Category List */}
      <MedicineList />
    </div>
  );
}

export default MedicinePage;
