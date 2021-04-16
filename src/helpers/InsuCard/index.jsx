import React from "react";
import "./insuCard.scss";

const InsuCard = ({
  secureName,
  productName,
  price,
  isElectric,
  isBonus,
  priceBonus,
  discount,
  isFromSecondForm,
}) => {
  return (
    <div className='insucard'>
      <div className='body'>
        <div className='textos'>
          <p className='soatSegurosMundial'>
            {secureName}
          </p>
          <p className='soatSegurosMundialTwo'>
            {productName}
          </p>
          {isFromSecondForm && (
            <p className='electric-info'>
              {`Costo: ${price}`}
            </p>
          )}
          {isElectric && (
            <>
              <p className='electric-info'>
                {`(Ya incluye 10% descuento para vehículos eléctricos)`}
              </p>
            </>
          )}
          {isBonus && (
            <p className='discount-info'>
              {`${discount}`}
            </p>
          )}
          <p className='costo556000Cops'>
            {`Costo: ${isFromSecondForm ? priceBonus : price}`}
          </p>
        </div>
        <img
          className="img-secure"
          alt=""
          src="https://static.overlay-tech.com/assets/a149d91e-a102-437b-a2f7-218649f1813c.png"
        />
      </div>
    </div>
  );
};

export default InsuCard;
