import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import MenProducts from "../data/MenProducts.json";
import "./MenCategory.css"; // Reuse styling
import { GiPriceTag } from "react-icons/gi";
import { RiDiscountPercentFill } from "react-icons/ri";

function MenCategory() {
  const { category } = useParams();
  const navigate = useNavigate();

  const filteredProducts = MenProducts.filter(p => p.category === category);

  return (
    <div className="medicine-page">
      <h2>Men's Products for {category}</h2>

      {filteredProducts.length === 0 ? (
        <p>No products found for this category.</p>
      ) : (
        <div className="medicine-list">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="medicine-card"
              onClick={() => navigate(`/men/details/${item.id}`)}
              style={{ cursor: "pointer" }}
            >
              <img src={item.image} alt={item.name} />
              <h4>{item.name}</h4>
              <p>Chemical Name: {item.chemicalName}</p>
              <p>{item.details}</p>
              <p>
                <b><GiPriceTag /> Price:</b> ₹{item.price} &nbsp;
                <span className="mrp">MRP: ₹{item.mrp}</span>
              </p>
              <p className="discount"><RiDiscountPercentFill /> {item.discount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MenCategory;
