import React, { useState } from "react";
import Medicines from "../data/Medicines.json";
import { useParams, useNavigate } from "react-router-dom";
import { GiPriceTag } from "react-icons/gi";
import { RiDiscountPercentFill } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";

import "./MedicineCard.css";

function MedicineCard({ user }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [, setMedAdded] = useState(false);

  const medicine = Medicines.find((med) => med.id === parseInt(id));

  if (!medicine) {
    return <div>Medicine not found</div>;
  }

  const handleAddToCart = () => {
    axios
      .post("http://localhost:5000/cart/add", {
      userId: user?.userId , 
      productId: medicine.id, // ✅ correct key name
      price: medicine.price,
      image: medicine.image,
      quantity: 1,
      })
      .then((response) => {
        console.log("Medicine added to cart:", response.data);
        toast.success("Medicine added to cart successfully!");
      })
      .catch((error) => {
        console.error("Error adding medicine to cart:", error);
        toast.error("Failed to add medicine to cart. Please try again.");
      });

    setMedAdded(true);
  };

  const similarMedicines = Medicines.filter(
    (med) => med.category === medicine.category && med.id !== medicine.id
  );

  return (
    <div className="medicine-detail-page">
      <h2>{medicine.name}</h2>

      <div className="medicine-detail-container">
        <img src={medicine.image} alt={medicine.name} />

        <div className="medicine-info">
          <p><b>Chemical Name:</b> {medicine.chemicalName}</p>
          <p><b>Details:</b> {medicine.details}</p>

          {/* FIXED PRICE DISPLAY */}
          <p className="price-section">
            <b><GiPriceTag /> Price:</b> <span className="price">₹{medicine.price}</span> &nbsp;
            <span className="mrp">MRP: ₹{medicine.mrp}</span>
          </p>

          <p className="discount">
            <RiDiscountPercentFill /> {medicine.discount}
          </p>
          <div className="button-group">
            <button onClick={handleAddToCart}>Quick Add</button>
            <button onClick={() => navigate("/cart")}>View My Cart</button>
          </div>
        </div>
      </div>

      <h3>Recommended for You</h3>
      <div className="recommendation-list">
        {similarMedicines.map((med) => (
          <div
            key={med.id}
            className="recommendation-card"
            onClick={() => navigate(`/medicine/details/${med.id}`)}
            style={{ cursor: "pointer" }}
          >
            <img src={med.image} alt={med.name} />
            <h4>{med.name}</h4>
            <p className="price">₹{med.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MedicineCard;
