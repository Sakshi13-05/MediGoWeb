import React from "react";
import { useNavigate } from "react-router-dom";
import "./ElderList.css"; // Use dedicated CSS for Elder section

function ElderList() {
  const navigate = useNavigate();

  const categories = [
    { name: "Mobility Aids", image: "/images/walker.png", key: "mobility" },
    { name: "Adult Diapers", image: "/images/adult-diapers.png", key: "diapers" },
    { name: "Joint Pain Relief", image: "/images/joint-pain.png", key: "elder-joint-relief" },
    { name: "Nutrition", image: "/images/elder-nutrition.png", key: "elder-nutrition" },
    { name: "Hearing Aids", image: "/images/hearing.png", key: "hearing-aids" },
    { name: "Elder Skincare", image: "/images/elder-skincare.png", key: "skincare" },
    { name: "BP Monitors", image: "/images/bp-monitor.png", key: "bp-monitors" },
    { name: "Walking Sticks", image: "/images/walking-stick.png", key: "walking-sticks" },
    { name: "Elder Essentials", image: "/images/elder-essentials.png", key: "essentials" },
    { name: "Eye Drops", image: "/images/eye-drop.png", key: "eye-care" },
    { name: "Comfy Clothing", image: "/images/comfy-clothes.png", key: "clothing" }
  ];

  const scrollLeft = () => {
    document.getElementById("elder-category-scroll").scrollLeft -= 200;
  };

  const scrollRight = () => {
    document.getElementById("elder-category-scroll").scrollLeft += 200;
  };

  return (
    <div className="elder-list-section">
      <h2>Elder Care</h2>
      <div className="elder-scroll-container">
        <button className="elder-scroll-btn left" onClick={scrollLeft}>
          &#8592;
        </button>

        <div className="elder-category-row" id="elder-category-scroll">
          {categories.map((cat) => (
            <div
              key={cat.key}
              className="elder-category-card"
              onClick={() => navigate(`/elder/category/${cat.key}`)}
            >
              <img src={cat.image} alt={cat.name} />
              <p>{cat.name}</p>
            </div>
          ))}
        </div>

        <button className="elder-scroll-btn right" onClick={scrollRight}>
          &#8594;
        </button>
      </div>
    </div>
  );
}

export default ElderList;
