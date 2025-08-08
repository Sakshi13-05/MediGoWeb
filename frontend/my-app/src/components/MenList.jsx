import React from "react";
import { useNavigate } from "react-router-dom";
import "./MenList.css"; // Use this one for correct path

function MenList() {
  const navigate = useNavigate();

  const categories = [
    { name: "Beard Care", image: "/images/beard.jpeg", key: "beard-care" },
    { name: "Perfumes", image: "/images/perfume.jpeg", key: "perfumes" },
    { name: "Face Wash", image: "/images/men-facewash.jpeg", key: "face-wash" },
    { name: "Hair Gel", image: "/images/hairgel.jpeg", key: "hair-gel" },
    { name: "Body Lotion", image: "/images/bodylotion.jpeg", key: "body-lotion" },
    { name: "Men's Shampoo", image: "/images/download.jpg", key: "shampoo" },
    { name: "Trimmers", image: "/images/trimmer.jpeg", key: "trimmers" },
    { name: "Face Cream", image: "/images/facecream.jpeg", key: "face-cream" },
    { name: "Men's Soap", image: "/images/soap.jpeg", key: "soap" },
    { name: "Hair Oil", image: "/images/hairoil.jpeg", key: "hair-oil" },
    { name: "Bath Essentials", image: "/images/bath.jpeg", key: "bath-essentials" },
    { name: "Deodorants", image: "/images/perfume.jpeg", key: "deodorants" },
    { name: "Combos", image: "/images/combo.jpeg", key: "combos" }
  ];

  const scrollLeft = () => {
    document.getElementById("men-category-scroll").scrollLeft -= 200;
  };

  const scrollRight = () => {
    document.getElementById("men-category-scroll").scrollLeft += 200;
  };

  return (
    <div className="men-list-section">
      <h2>Men's Care</h2>
      <div className="men-scroll-container">
        <button className="men-scroll-btn left" onClick={scrollLeft}>
          &#8592;
        </button>

        <div className="men-category-row" id="men-category-scroll">
          {categories.map((cat) => (
            <div
              key={cat.key}
              className="men-category-card"
              onClick={() => navigate(`/men/category/${cat.key}`)}
              style={{ cursor: "pointer" }}
            >
              <img src={cat.image} alt={cat.name} />
              <p>{cat.name}</p>
            </div>
          ))}
        </div>

        <button className="men-scroll-btn right" onClick={scrollRight}>
          &#8594;
        </button>
      </div>
    </div>
  );
}

export default MenList;
