import React from "react";
import "./payments.scss";

const Payments = ({ isSecondView }) => {
  return (
    <div className={`container-payments ${isSecondView ? 'second-view' : ''}`}>
      <p className='metodosDePago'>
        Métodos de pago
      </p>
      <div className='logos'>
        <div className='grupo293'>
          <div className='relativeWrapperOne'>
            <div className='rectangulo488' />
            <img
              alt=""
              className='trazado576'
              src="https://static.overlay-tech.com/assets/d0f7de4b-2ccb-46e8-bf5f-d87d0a891a51.svg"
            />
            <img
              alt=""
              className='trazado577'
              src="https://static.overlay-tech.com/assets/42598c78-31e6-4d81-aaa6-1f1af6379da7.svg"
            />
          </div>
          <img
            alt=""
            className='trazado575'
            src="https://static.overlay-tech.com/assets/6ddd0253-bed4-4b39-b399-f04d74ac5cba.svg"
          />
        </div>
        <img
          alt=""
          className='grupo443'
          src="https://static.overlay-tech.com/assets/c03a56a5-43a5-45e1-a9d2-82690e352c8c.svg"
        />
        <img
          alt=""
          className='grupo443'
          src="https://static.overlay-tech.com/assets/83dfc86f-25fa-44aa-a271-a86dfea1a0d0.png"
        />
      </div>
    </div>
  );
};

export default Payments;
