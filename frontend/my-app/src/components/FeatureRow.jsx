import React from "react";
import "./FeatureRow.css";
import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "Medicine",
    offer: "SAVE 24%",
    img: "https://cdn-icons-png.flaticon.com/128/2972/2972435.png",
    path: "/medicine",
  },
  {
    title: "Lab Tests",
    offer: "UPTO 70% OFF",
    img: "https://cdn-icons-png.flaticon.com/128/2920/2920282.png",
    path: "/lab-tests",
  },
  {
    title: "Doctor Consult",
    offer: "",
    img: "https://cdn-icons-png.flaticon.com/128/3774/3774299.png",
    path: "/doctor-consult",
  },
  {
    title: "Healthcare",
    offer: "UPTO 60% OFF",
    img: "https://cdn-icons-png.flaticon.com/128/3771/3771480.png",
    path: "/healthcare",
  },
  {
    title: "Offers",
    offer: "",
    img: "https://cdn-icons-png.flaticon.com/128/1077/1077114.png",
    path: "/offers",
  },
];

function FeatureRow() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path); // This will navigate to the specified route
  };

  return (
    <div className="feature-row-wrapper">
      <div className="feature-row">
        {features.map((item, index) => (
          <div
            className="feature-card"
            key={index}
            onClick={() => handleClick(item.path)}
          >
            <img src={item.img} alt={item.title} className="feature-img" />
            <p className="feature-title">{item.title}</p>
            {item.offer && <p className="feature-offer">{item.offer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeatureRow;
