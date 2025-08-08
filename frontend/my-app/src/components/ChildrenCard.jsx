import React, { useMemo, useState } from "react";
import Children from "../data/Children.json";
import { useParams, useNavigate } from "react-router-dom";
import { GiPriceTag } from "react-icons/gi";
import { RiDiscountPercentFill } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import "./ChildrenCard.css";

const API = "http://localhost:5000";

function ChildrenCard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [adding, setAdding] = useState(false);

  const product = useMemo(
    () => Children.find((pro) => pro.id === Number(id)),
    [id]
  );

  const getFinalPrice = (mrp, discount = 0) =>
    Math.round((mrp || 0) * (1 - (discount || 0) / 100));

  const similarProduct = useMemo(() => {
    if (!product) return [];
    return Children.filter(
      (pro) => pro.category === product.category && pro.id !== product.id
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
        price: dealPrice,      // discounted price sent to backend
        image: product.image,
        quantity: 1,
      });
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="child-detail-page">
      <h2>{product.name}</h2>

      <div className="child-detail-container">
        <img src={product.image} alt={product.name} />

        <div className="child-info">
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
                <span className="mrp">₹{basePrice}</span>
                <span className="discount">
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

      {similarProduct.length > 0 && (
        <>
          <h3>Recommended for You</h3>
          <div className="child-recommendation-list">
            {similarProduct.map((pro) => {
              const recBase = pro.mrp ?? pro.price ?? 0;
              const recFinal = getFinalPrice(recBase, pro.discount ?? 0);
              return (
                <div
                  key={pro.id}
                  className="child-recommendation-card"
                  onClick={() => navigate(`/child/details/${pro.id}`)}
                >
                  <img src={pro.image} alt={pro.name} />
                  <h4>{pro.name}</h4>
                  <p>
                    ₹{recFinal}{" "}
                    {pro.discount > 0 && (
                      <span className="mrp">₹{recBase}</span>
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

export default ChildrenCard;
