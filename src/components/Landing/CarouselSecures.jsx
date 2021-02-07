import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


const responsive = {
    0: { items: 1 },
    480: { items: 2 },
    768: { items: 5 },
    992: { items: 8 },
};

const items = [
    <div className="item" data-value="1">
      <img src="" alt="" />
      <p>Mascotas</p>
    </div>,
    <div className="item" data-value="2">
      <img src="" alt="" />
      <p>Carro / Moto</p>
    </div>,
    <div className="item" data-value="3">
      <img src="" alt="" />
      <p>Celular</p>
    </div>,
    <div className="item" data-value="4">
      <img src="" alt="" />
      <p>Tablet</p>
    </div>,
    <div className="item" data-value="5">
      <img src="" alt="" />
      <p>Scooter</p>
    </div>,
    <div className="item" data-value="6">
      <img src="" alt="" />
      <p>Bicicleta</p>
    </div>,
    <div className="item" data-value="7">
      <img src="" alt="" />
      <p>Smartwatch</p>
    </div>,
    <div className="item" data-value="8">
      <img src="" alt="" />
      <p>Computador</p>
    </div>
];

// https://github.com/maxmarinich/react-alice-carousel
// https://maxmarinich.github.io/react-alice-carousel/
const CarouselSecures = () => (
  <div className="carousel-container">
    <AliceCarousel
      mouseTracking
      items={items}
      responsive={responsive}
      disableDotsControls
      disableButtonsControls
    />
  </div>
);

export default CarouselSecures;
