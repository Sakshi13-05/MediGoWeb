import React, { useState, useEffect } from 'react';
import './Women.css';
import WomenSection from '../components/WomenSection';
import WomenList from '../components/WomenList';

function Women() {
  const hints = ["Sanitary Pads", "Pregnancy Test Kit", "Intimate Wash", "Panty Liners", "Feminine Wipes"];

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
   
  <div className="women-page">
  <div className="women-page__search">
    <div className="women-page__input-container">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="women-page__input"
        placeholder=""
      />
      {inputValue === '' && (
        <div className={`women-page__placeholder ${fade ? 'women-page__placeholder--visible' : 'women-page__placeholder--hidden'}`}>
          What are you looking for? <span className="women-page__try-text">Try <strong>{hints[index]}</strong></span>
        </div>
      )}
    </div>
  </div>

  <WomenSection />
  <WomenList />
</div>

);

  
}

export default Women;
