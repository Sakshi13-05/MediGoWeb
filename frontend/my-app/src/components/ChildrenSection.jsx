import "./CHildrenSection.css";
import React from "react";
import Slider from "react-slick";
import child1 from "../image/child1.png";
import child2 from "../image/child2.png";
import child3 from "../image/child3.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ChildrenSection() {
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
    <div className="children-section">
      
      {/* Carousel Section */}
      <Slider {...settings} className="carousel">
        <div className="carousel-card">
          <img src={child1} alt="On Time Test" className="carousel-image" />
        </div>
        <div className="carousel-card">
          <img src={child2} alt="Health Packages" className="carousel-image" />
        </div>
        <div className="carousel-card">
          <img src={child3} alt="Compare Plans" className="carousel-image" />
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

export default ChildrenSection;
