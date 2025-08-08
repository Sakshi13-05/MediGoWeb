import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GiPriceTag } from "react-icons/gi";
import { RiDiscountPercentFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { api } from "../utils/api";
import Women from "../data/Women.json";
import "./WomenCard.css";

function WomenCard() {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);

  
  const product = useMemo(() => Women.find((p) => p.id === Number(id)), [id]);

  
  const getFinalPrice = (mrp, discount = 0) =>
    Math.round(mrp * (1 - discount / 100));

  
  const similarProducts = useMemo(() => {
    if (!product) return [];
    return Women.filter(
      (p) => p.category === product.category && p.id !== product.id
    );
  }, [product]);

  
  if (!product) return <div>Product not found</div>;

  const basePrice = product.mrp ?? product.price ?? 0;
  const discountPct = product.discount ?? 0;
  const dealPrice = getFinalPrice(basePrice, discountPct);
  const saved = Math.round(basePrice - dealPrice);

  const handleAddToCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.userId) {
      toast.warn("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }

    try {
      setAdding(true);
      await api.post("/cart/add", {
        userId: user.userId,
        productId: product.id,
        name: product.name,
        price: dealPrice, 
        image: product.image,
        quantity: 1,
      });
      toast.success(`${product.name} added to cart!`);
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error(err.response?.data?.message || "Error adding to cart.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="women-detail-page">
      <h2>{product.name}</h2>

      <div className="women-detail-container">
        <img src={product.image} alt={product.name} />

        <div className="women-info">
          <p>
            <b>Chemical Name:</b> {product.chemicalName}
          </p>
          <p>
            <b>Details:</b> {product.details}
          </p>

          <div className="price-block">
            <span className="final-price"><GiPriceTag/> ₹{dealPrice}</span>
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
          <div className="women-recommendation-list">
            {similarProducts.map((pro) => {
              const recBase = pro.mrp ?? pro.price ?? 0;
              const recDiscount = pro.discount ?? 0;
              const recFinal = getFinalPrice(recBase, recDiscount);

              return (
                <div
                  key={pro.id}
                  className="women-recommendation-card"
                  onClick={() => navigate(`/women/details/${pro.id}`)}
                >
                  <img src={pro.image} alt={pro.name} />
                  <h4>{pro.name}</h4>
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

export default WomenCard;
