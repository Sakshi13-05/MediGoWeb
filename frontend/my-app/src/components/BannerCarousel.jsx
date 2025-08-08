import React, {  } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './BannerCarousel.css';

const banners = [
  {
    img: 'https://images.unsplash.com/photo-1631217873436-b0fa88e71f0a?w=600&auto=format&fit=crop&q=60',
    alt: 'Doctor Consultation',
  },
  {
    img: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop&q=60',
    alt: 'Affordable Medicines',
  },
  {
    img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&auto=format&fit=crop&q=60',
    alt: 'Skin Care',
  },
];

function BannerCarousel() {
  

  return (
    <div className="banner-wrapper">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        spaceBetween={30}
        className="banner-swiper"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="banner-slide">
              <img
                src={banner.img}
                alt={banner.alt}
                className="banner-img"
              />
              <div className="banner-text">{banner.alt}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default BannerCarousel;
