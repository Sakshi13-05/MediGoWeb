import React, { useState, useEffect } from "react";
import ElderSection from "../components/ElderSection";
import ElderList from "../components/ElderList";
import "./ElderPage.css";

function ElderPage() {
  const hints = ["Walking Stick", "Hearing Aid", "Blood Pressure Monitor", "Adult Diapers", "Vitamins"];
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
    <div className="elder-page">
      <div className="elder-page__search">
        <div className="elder-page__input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="elder-page__input"
            placeholder=""
          />
          {inputValue === '' && (
            <div className={`elder-page__placeholder ${fade ? 'elder-page__placeholder--visible' : 'elder-page__placeholder--hidden'}`}>
              What are you looking for? <span className="elder-page__try-text">Try <strong>{hints[index]}</strong></span>
            </div>
          )}
        </div>
      </div>

      <ElderSection />
      <ElderList />
    </div>
  );
}

export default ElderPage;
