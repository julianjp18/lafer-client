import React from "react";
import { Button, Row, Col } from 'antd';
import './bonusSoat.scss';

const BonusDiscount = ({ }) => {

  const onFinish = (values) => {
  };

  return (
    <div className="card-bonus-container">
      <Row>
        <Col xs={16}>
          <p className="card-title">SOAT Seguros Mundial</p>
          <p className="card-last-cost">Costo: $ 566.000</p>
          <p className="card-bonus-info">Bono descuento: $ 34.000</p>
          <p className="card-cost">Costo: $522.000</p>
        </Col>
        <Col xs={8}>
          <img src={'images/secures_logos/seguros-mundial.png'} alt="card secure" className="card-secure-img"/>
        </Col>
        <Row className="payment-container">
          <Col xs={24}>
            <p>Métodos de pago</p>
          </Col>
          <Col xs={8}>
            <img className="payment-img mastercard" src={'/images/footer/mastercard-b.svg'} alt="mastercard"/>
          </Col>
          <Col xs={8}>
            <img className="payment-img visa" src={'/images/footer/visa-b.png'} alt="visa"/>
          </Col>
          <Col xs={8}>
            <img className="payment-img pse" src={'/images/footer/pse.png'} alt="pse"/>
          </Col>
        </Row>
        <div className="see-points-container">
          <p className="see-points"><a href="">Ver cobertura</a></p>
        </div>
        <div className="button-container">
          <Button className="btn-submit" type="primary" htmlType="submit">
            Comprar SOAT con descuento
          </Button>
        </div>
      </Row>
    </div>
  );
}

export default BonusDiscount;
