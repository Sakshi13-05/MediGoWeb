import React from "react";
import { useNavigate } from "react-router-dom";
import "./MedicineList.css";
import download from "../image/download.jpeg";
import skincare from "../image/skincare.jpeg";
import wound from "../image/wound.jpeg";
import tonics from "../image/tonics.jpeg";
import baby from "../image/baby.jpeg";
import eye from "../image/eye.jpeg";
import dia from "../image/dia.jpeg";
import stomach from "../image/stomach.jpeg";
import women from "../image/women.jpeg";
import pain from "../image/pain.jpeg";
import heart from "../image/heart.jpeg";

function MedicineList() {
  const navigate = useNavigate();

  const categories = [
    { name: "Cold & Fever", image: download, key: "cold-fever" },
    { name: "Skin Care", image: skincare, key: "skin-care" },
    { name: "Wound & Swelling", image: wound, key: "wound-swelling" },
    { name: "Tonics & Supplements", image: tonics, key: "tonics" },
    { name: "Diabetes Care", image: dia, key: "diabetes" },
    { name: "Pain Relief", image: pain, key: "pain-relief" },
    { name: "Stomach Care", image: stomach, key: "stomach" },
    { name: "Heart & BP", image: heart, key: "heart-bp" },
    { name: "Eye & Ear Care", image: eye, key: "eye-ear" },
    { name: "Women's Health", image: women, key: "women-health" },
    { name: "Baby Care", image: baby, key: "baby-care" },
  ];

  const scrollLeft = () => {
    document.getElementById("unique-category-scroll").scrollLeft -= 200;
  };

  const scrollRight = () => {
    document.getElementById("unique-category-scroll").scrollLeft += 200;
  };

  return (
    <div className="unique-medicine-list-section">
      <h2>Shop by Category</h2>
      <div className="unique-medicine-scroll-container">
        <button className="unique-medicine-scroll-btn left" onClick={scrollLeft}>
          &#8592;
        </button>

        <div className="unique-medicine-category-row" id="unique-category-scroll">
          {categories.map((cat) => (
            <div
              key={cat.key}
              className="unique-medicine-category-card"
              onClick={() => navigate(`/medicine/category/${cat.key}`)}
            >
              <img src={cat.image} alt={cat.name} />
              <p>{cat.name}</p>
            </div>
          ))}
        </div>

        <button className="unique-medicine-scroll-btn right" onClick={scrollRight}>
          &#8594;
        </button>
      </div>
    </div>
  );
}

export default MedicineList;
