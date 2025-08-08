import "./LabTest.css";
import React from "react";
import Slider from "react-slick";
import lab1 from "../image/lab1.png";
import lab2 from "../image/lab2.png";
import lab3 from "../image/lab3.png";
import HealthPackages from "../components/HealthPackages";

import LabBook from "../components/LabBook";    
import { useNavigate } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function LabTest() {
    const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  return (
    <div className="lab-section">
      
      {/* Carousel Section */}
      <Slider {...settings} className="carousel">
        <div className="carousel-card">
          <img src={lab1} alt="On Time Test" className="carousel-image" />
        </div>
        <div className="carousel-card">
          <img src={lab2} alt="Health Packages" className="carousel-image" />
        </div>
        <div className="carousel-card">
          <img src={lab3} alt="Compare Plans" className="carousel-image" />
        </div>
      </Slider>

       <div className="lab-buttons">
        <button onClick={()=>{navigate("/test")}}>🧪 All Tests</button>
        <button>❤️ Health Packages</button>
        
        
      </div>

      {/* Promotional Strip */}
      <div className="lab-strip">
        <HealthPackages />

        <span>Save 5% on medicines, 50% on 1st lab test & FREE delivery with PLUS membership</span>
      </div>
    </div>
  );
}

export default LabTest;
