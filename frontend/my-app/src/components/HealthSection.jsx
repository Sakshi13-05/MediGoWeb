import "./HealthSection.css";
import React from "react";
import Slider from "react-slick";
import banner3 from "../image/banner3.jpg"
import banner4 from "../image/banner4.jpg"
import b7 from "../image/b7.jpg"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HealthSection() {
  
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
    <div className="health-section">
      
      {/* Carousel Section */}
    <Slider {...settings} className="carousel">
  <div className="carousel-card">
    <img src={banner4} alt="On Time Test" className="carousel-image" />
  </div>
  <div className="carousel-card">
    <img src={b7} alt="Health Packages" className="carousel-image" />
  </div>
  <div className="carousel-card">
    <img src={banner3} alt="Compare Plans" className="carousel-image" />
  </div>
</Slider>

      

      {/* Promotional Banner */}
      <div className="promo-banner">
        <span className="plus-icon">+</span>
        <span>Save 5% on medicines, 50% on 1st lab test & get FREE delivery with PLUS membership</span>
        <a href="#">Know more &gt;</a>
      </div>
    </div>
  );
}

export default HealthSection;
