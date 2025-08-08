import React, { useState, useEffect } from 'react';
import './Children.css';
import ChildrenSection from '../components/ChildrenSection';
import ChildrenList from '../components/ChildrenList';

function Children() {
  const hints = ["Baby Diapers", "Kids Multivitamins", "Baby Lotion", "Hand Sanitizer", "Kids Cough Syrup"];

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
    <div className="children-page">
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
      <ChildrenSection />

      {/* Category List */}
      <ChildrenList />
    </div>
  );
}

export default Children;
