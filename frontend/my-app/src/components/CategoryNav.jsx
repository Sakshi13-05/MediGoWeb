import React from 'react';
import './CategoryNav.css';
import { Link } from 'react-router-dom';

function CategoryNav() {
  return (
    <div className="category-nav">
      <Link to="/medicine" className="category-item">Medicine</Link>
      <Link to="/men" className="category-item">Men</Link>
      <Link to="/women" className="category-item">Women</Link>
      <Link to="/child" className="category-item">Children</Link>
      <Link to="/elder" className="category-item">Elder</Link>
    </div>
  );
}

export default CategoryNav;
