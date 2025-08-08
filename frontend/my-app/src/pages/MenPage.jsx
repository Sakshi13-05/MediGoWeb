import React, { useState, useEffect } from 'react';
import './Men.css';
import MenSection from '../components/MenSection';
import MenList from '../components/MenList';

function Men() {
  const hints = ["Beard Oil", "Perfume", "Face Wash", "Men's Kit", "Shaving Gel", "Hair Gel"];
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
    <div className="men-page">
      <div className="men-page__search">
        <div className="men-page__input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="men-page__input"
            placeholder=""
          />
          {inputValue === '' && (
            <div className={`men-page__placeholder ${fade ? 'men-page__placeholder--visible' : 'men-page__placeholder--hidden'}`}>
              What are you looking for? <span className="men-page__try-text">Try <strong>{hints[index]}</strong></span>
            </div>
          )}
        </div>
      </div>

      <MenSection />
      <MenList />
    </div>
  );
}

export default Men;
