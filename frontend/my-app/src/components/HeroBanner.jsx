import React from 'react';
import './HeroBanner.css';  // Local CSS

function HeroBanner() {
  return (
    <div className="hero-banner">
      <div className="hero-text">
        <h1>Your Health, Our Priority</h1>
        <p>Consult top doctors from the comfort of your home</p>
      </div>
      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1631217868204-db1ed6bdd224?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Doctor Consultation"
        />
      </div>
    </div>
  );
}

export default HeroBanner;
