import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Children from "../data/Children.json";
import "./ChildrenCat.css";
import { GiPriceTag } from "react-icons/gi";
import { RiDiscountPercentFill } from "react-icons/ri";

function ChildrenCat() {
  const { category } = useParams();
  const navigate = useNavigate();

  const filterProd = Children.filter((pro) => pro.category === category);

  return (
    <div className="child-page">
      <h2>Products for {category}</h2>

      {filterProd.length === 0 ? (
        <p>No products found for this category.</p>
      ) : (
        <div className="child-list">
          {filterProd.map((pro, idx) => (
            <div
              key={idx}
              className="child-card"
              onClick={() => navigate(`/child/details/${pro.id}`)}
              style={{ cursor: "pointer" }}
            >
              <img src={pro.image} alt={pro.name} />
              <h4>{pro.name}</h4>
              <p>Chemical Name: {pro.chemicalName}</p>
              <p>{pro.details}</p>
              <p>
                <b>
                  <span>
                    <GiPriceTag />
                  </span>
                  Price:
                </b>{" "}
                ₹{pro.price} &nbsp;
                <span className="mrp">MRP: ₹{pro.mrp}</span>
              </p>
              <p className="discount">
                <span>
                  <RiDiscountPercentFill />
                </span>
                {pro.discount}%
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ChildrenCat;
