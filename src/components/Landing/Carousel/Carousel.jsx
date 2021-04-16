import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import useMedia from 'use-media';
import 'react-alice-carousel/lib/alice-carousel.css';
import './carousel.scss';

export const Carousel = props => {
  const isMobile = useMedia({ maxWidth: 767 });
  const responsive = {
    0: { items: 1 },
    // 480: { items: 2 },
    // 768: { items: 5 },
    // 992: { items: 8 },
  };

  const items = [
    <div className="item" data-value="1">
      <img src={`images/Siendo-Seguros-banners/Siendo-Seguros-banner-1-${isMobile ? 'mobile' : 'desktop'}.png`} alt="Banner" />
    </div>
    // ,
    // <div className="item" data-value="2">
    //   <img src={`images/Siendo-Seguros-banners/Siendo-Seguros-banner-2-${isMobile ? 'mobile' : 'desktop'}.png`} alt="Banner" />
    // </div>
  ];
  // https://github.com/maxmarinich/react-alice-carousel
  // https://maxmarinich.github.io/react-alice-carousel/

  return (
    <div className="carousel__container">
      <AliceCarousel
        items={items}
        responsive={responsive}
        disableButtonsControls
        mouseTrackingEnabled
        autoPlayInterval={6000}
        animationDuration={1000}
      // autoPlay
      // infinite
      />
    </div>
  );
}

export default Carousel;
