import React from "react";
import { useNavigate } from "react-router-dom";
import "./ChildrenList.css";
import child11 from "../image/child11.jpg";
import child22 from "../image/child22.jpg";
import healthb from "../image/healthb.jpg"
import child33 from "../image/child33.jpg";

function WomenList() {
  const navigate = useNavigate();

  const categories = [
    { name: "Nutrition Growth", image: child11, key: "nutrition-growth" },
    { name: "Baby Care", image: child22, key: "baby-care" },
    { name: "Hygiene Protection", image: child33, key: "hygiene-protection" },
    { name: "Health Wellness", image: healthb, key: "health-wellness" },
  ];

  return (
    <div className="children-list-section">
      <h2>Shop by Category</h2>
      <div className="children-category-grid">
        {categories.map((cat) => (
          <div
            key={cat.key}
            className="children-category-card"
            onClick={() => navigate(`/child/category/${cat.key}`)}
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
