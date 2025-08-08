import "./ElderSection.css";
import React from "react";
import Slider from "react-slick";
import elder1 from "../image/elder1.png";
import elder2 from "../image/elder2.png";
import elder3 from "../image/elder3.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ElderSection() {
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
   <div className="elder-section">
  <Slider {...settings} className="elder-section__carousel">
    <div className="elder-section__card">
      <img src={elder1} alt="Elder Support" className="elder-section__image" />
    </div>
    <div className="elder-section__card">
      <img src={elder2} alt="Mobility Aid" className="elder-section__image" />
    </div>
    <div className="elder-section__card">
      <img src={elder3} alt="Joint Health" className="elder-section__image" />
    </div>
  </Slider>

  <div className="elder-section__promo">
    <span className="elder-section__plus">+</span>
    <span className="elder-section__promo-text">
      Up to 50% OFF on Elder Care Essentials | Mobility Aids, Diapers & More
    </span>
    <a href="#" className="elder-section__promo-link">Browse more &gt;</a>
  </div>
</div>


  );
}

export default ElderSection;
