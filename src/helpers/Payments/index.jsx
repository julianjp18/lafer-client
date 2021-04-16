import React from "react";
import "./payments.scss";
import MasterCard from '../../assets/images/master-card.png';
import Visa from '../../assets/images/visa.svg';
import PSE from '../../assets/images/pse.png';

const Payments = ({ isSecondView }) => {
  return (
    <div className={`container-payments ${isSecondView ? 'second-view' : ''}`}>
      <div className='content-payments'>
        <p className='tituloClaro'>Métodos de pago</p>
        <div className='logos'>
          <img
            alt=""
            className='masterCard1'
            src={MasterCard}
          />
          <img
            alt=""
            className='masterCard1'
            src={Visa}
          />
          <img
            alt=""
            className='masterCard1'
            src={PSE}
          />
        </div>
      </div>
    </div>
  );
};

export default Payments;
