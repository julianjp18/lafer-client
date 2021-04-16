import React from "react";
import SegurosMundial from '../../assets/images/seguros-mundial.png';
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
          src={SegurosMundial}
        />
      </div>
    </div>
  );
};

export default InsuCard;
