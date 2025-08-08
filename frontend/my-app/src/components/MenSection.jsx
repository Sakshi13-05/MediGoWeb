import "./MenSection.css";
import React from "react";
import Slider from "react-slick";
import men1 from "../image/men1.png";
import men2 from "../image/men2.png"; 
import men3 from "../image/men3.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MenSection() {
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
    <div className="men-section">
      {/* Carousel Section */}
      <Slider {...settings} className="men-section__carousel">
        <div className="men-section__card">
          <img src={men1} alt="Men Grooming" className="men-section__image" />
        </div>
        <div className="men-section__card">
          <img src={men2} alt="Beard Oils" className="men-section__image" />
        </div>
        <div className="men-section__card">
          <img src={men3} alt="Men Skincare" className="men-section__image" />
        </div>
      </Slider>

      {/* Promotional Banner */}
      <div className="men-section__promo">
        <span className="men-section__plus">+</span>
        <span className="men-section__promo-text">
          Save up to 60% on Men's Grooming | New Launches + Combos Available
        </span>
        <a href="#" className="men-section__promo-link">Explore Deals &gt;</a>
      </div>
    </div>
  );
}

export default MenSection;
