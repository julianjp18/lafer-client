import React from "react";
import { Button, Row, Col } from 'antd';
import './bonusSoat.scss';

const BonusMilles = ({ }) => {

  const onFinish = (values) => {
  };

  return (
    <div className="card-bonus-container">
      <Row>
        <Col xs={16}>
          <p className="card-title">SOAT Seguros Mundial</p>
          <p className="card-bonus-info">Bono 500 millas</p>
          <p className="card-cost">Costo: $522.000</p>
        </Col>
        <Col xs={8}>
          <img src={'images/secures_logos/seguros-mundial.png'} alt="card secure" className="card-secure-img"/>
          <img src={'images/lifemiles-1.png'} alt="card secure" className="card-secure-img lifemiles"/>
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
        <div className="extra-info-container">
          <p className="extra-info">
            Para disfrutar este bono debes tener cuenta LifeMiles y recibirás las millas en los 30 días siguientes a la fecha de compra del SOAT
          </p>
        </div>
      </Row>
    </div>
  );
}

export default BonusMilles;
