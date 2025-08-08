import React, { useState } from 'react';
import './LabSearch.css';

function LabSearch({ setSearchTerm, suggestions }) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = suggestions.filter((item) =>
    item.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSelect = (value) => {
    setInputValue(value);
    setSearchTerm(value);
    setShowSuggestions(false);
  };

  return (
    <div className="labsearch">
      <div className="labsearch__input-container">
        <input
          type="text"
          value={inputValue}
          placeholder="Search lab tests..."
          onChange={(e) => {
            setInputValue(e.target.value);
            setSearchTerm(e.target.value);
            setShowSuggestions(true);
          }}
          className="labsearch__input"
        />
        {showSuggestions && inputValue && filteredSuggestions.length > 0 && (
          <ul className="labsearch__suggestions">
            {filteredSuggestions.map((item) => (
              <li key={item.id} onClick={() => handleSelect(item.name)}>
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default LabSearch;
