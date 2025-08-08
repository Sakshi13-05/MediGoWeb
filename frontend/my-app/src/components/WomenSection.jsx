import "./WomenSection.css";
import React from "react";
import Slider from "react-slick";
import women11 from "../image/women11.png";
import women22 from "../image/women22.png";
import women33 from "../image/women33.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function WomenSection() {
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
    <div className="women-section">
      
      {/* Carousel Section */}
      <Slider {...settings} className="carousel">
        <div className="carousel-card">
          <img src={women11} alt="On Time Test" className="carousel-image" />
        </div>
        <div className="carousel-card">
          <img src={women22} alt="Health Packages" className="carousel-image" />
        </div>
        <div className="carousel-card">
          <img src={women33} alt="Compare Plans" className="carousel-image" />
        </div>
      </Slider>

      {/* Promotional Banner */}
      <div className="promo-banner">
        <span className="plus-icon">+</span>
        <span>Save 5% on women care products, 50% on 1st lab test & get FREE delivery with PLUS membership</span>
        <a href="#">Know more &gt;</a>
      </div>
    </div>
  );
}

export default WomenSection;
