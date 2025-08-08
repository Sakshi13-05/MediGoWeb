import React, { useMemo, useState } from "react";
import MenProducts from "../data/MenProducts.json";
import { useParams, useNavigate } from "react-router-dom";
import { GiPriceTag } from "react-icons/gi";
import { RiDiscountPercentFill } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import "./MenProductCard.css";

const API = "http://localhost:5000";

function MenProductCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);

  // Find product
  const product = useMemo(
    () => MenProducts.find((p) => p.id === Number(id)),
    [id]
  );

  // Helpers (not hooks)
  const getFinalPrice = (mrp, discount = 0) =>
    Math.round(mrp * (1 - discount / 100));

  const similarProducts = useMemo(() => {
    if (!product) return [];
    return MenProducts.filter(
      (p) => p.category === product.category && p.id !== product.id
    );
  }, [product]);

  if (!product) return <div>Product not found</div>;

  const basePrice = product.mrp ?? product.price ?? 0;
  const discountPct = product.discount ?? 0;
  const dealPrice = getFinalPrice(basePrice, discountPct);
  const saved = Math.max(0, basePrice - dealPrice);

  const handleAddToCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.userId) {
      toast.warn("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }

    try {
      setAdding(true);
      await axios.post(`${API}/cart/add`, {
        userId: user.userId,
        productId: product.id, // keep consistent with backend
        name: product.name,
        price: dealPrice,      // send discounted price
        image: product.image,
        quantity: 1,
      });
      toast.success(`${product.name} added to cart!`);
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error(err.response?.data?.message || "Failed to add item.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="men-detail-page">
      <h2>{product.name}</h2>

      <div className="men-detail-container">
        <img src={product.image} alt={product.name} />

        <div className="men-info">
          <p>
            <b>Chemical Name:</b> {product.chemicalName}
          </p>
          <p>
            <b>Details:</b> {product.details}
          </p>

          <div className="price-block">
            <span className="final-price">₹{dealPrice}</span>
            {discountPct > 0 && (
              <>
                <span className="mrp-strike">₹{basePrice}</span>
                <span className="discount-tag">
                  <RiDiscountPercentFill /> {discountPct}% off
                </span>
                <span className="you-save">You save ₹{saved}</span>
              </>
            )}
          </div>

          <div className="button-group">
            <button onClick={handleAddToCart} disabled={adding}>
              {adding ? "Adding..." : "Quick Add"}
            </button>
            <button onClick={() => navigate("/cart")}>View My Cart</button>
          </div>
        </div>
      </div>

      {similarProducts.length > 0 && (
        <>
          <h3>Recommended for You</h3>
          <div className="recommendation-list">
            {similarProducts.map((item) => {
              const recBase = item.mrp ?? item.price ?? 0;
              const recDiscount = item.discount ?? 0;
              const recFinal = getFinalPrice(recBase, recDiscount);

              return (
                <div
                  key={item.id}
                  className="recommendation-card"
                  onClick={() => navigate(`/men/details/${item.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={item.image} alt={item.name} />
                  <h4>{item.name}</h4>
                  <p>
                    ₹{recFinal}{" "}
                    {recDiscount > 0 && (
                      <span className="mrp-strike">₹{recBase}</span>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default MenProductCard;
