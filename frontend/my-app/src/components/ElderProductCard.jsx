import React, { useState } from "react";
import ElderProducts from "../data/ElderProducts.json";
import { useParams, useNavigate } from "react-router-dom";
import { GiPriceTag } from "react-icons/gi";
import { RiDiscountPercentFill } from "react-icons/ri";
import axios from "axios";
import "./ElderProductCard.css"; // Updated CSS

function ElderProductCard({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [, setItemAdded] = useState(false);

  const product = ElderProducts.find((prod) => prod.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    axios
      .post("http://localhost:5000/cart/add", {
        userId: user.userId,
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
      .then((response) => {
        console.log("Item added to cart:", response.data);
        alert("Item added to cart successfully!");
        setItemAdded(true);
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        alert("Failed to add to cart. Please try again.");
      });
  };

  const similarProducts = ElderProducts.filter(
    (item) => item.category === product.category && item.id !== product.id
  );

  return (
    <div className="elder-detail-page">
      <h2>{product.name}</h2>

      <div className="elder-detail-container">
        <img src={product.image} alt={product.name} />

        <div className="elder-info">
          <p><b>Chemical Name:</b> {product.chemicalName}</p>
          <p><b>Details:</b> {product.details}</p>
          <p className="price-block">
            <b><GiPriceTag /> Price:</b> ₹{product.price} &nbsp;
            <span className="mrp">MRP: ₹{product.mrp}</span>
          </p>
          <p className="discount">
            <RiDiscountPercentFill /> {product.discount}
          </p>
          <div className="button-group">
            <button onClick={handleAddToCart}>Quick Add</button>
            <button onClick={() => navigate("/cart")}>View My Cart</button>
          </div>
        </div>
      </div>

      <h3>Recommended for You</h3>
      <div className="recommendation-list">
        {similarProducts.map((item) => (
          <div
            key={item.id}
            className="recommendation-card"
            onClick={() => navigate(`/elder/details/${item.id}`)}
            style={{ cursor: "pointer" }}
          >
            <img src={item.image} alt={item.name} />
            <h4>{item.name}</h4>
            <p>₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ElderProductCard;
