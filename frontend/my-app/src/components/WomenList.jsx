import React from "react";
import { useNavigate } from "react-router-dom";
import "./WomenList.css";
import mens from "../image/mens.jpg";
import preg from "../image/preg.jpg";
import ini from "../image/ini.jpg";
import essen from "../image/essen.jpg";

function WomenList() {
  const navigate = useNavigate();

  const categories = [
    { name: "Menstrual Care", image: mens, key: "menstrual-care" },
    { name: "Pregnancy Fertility", image: preg, key: "pregnancy-fertility" },
    { name: "Intimate Hygiene", image: ini, key: "intimate-hygiene" },
    { name: "Essentials", image: essen, key: "everyday-essentials" },
  ];

  return (
    <div className="medicine-list-section">
      <h2>Shop by Category</h2>
      <div className="medicine-category-grid">
        {categories.map((cat) => (
          <div
            key={cat.key}
            className="medicine-category-card"
            onClick={() => navigate(`/women/category/${cat.key}`)}
          >
            <img src={cat.image} alt={cat.name} />
            <p>{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WomenList;
