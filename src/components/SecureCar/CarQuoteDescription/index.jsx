import React from "react";
import { Row, Col } from 'antd';

const CarQuoteDescription = ({
  vehicle,
  brand,
  model,
  zeroKm
}) => (
  <Row className="descrip-container">
    <h2 className="descrip-title">Información automóvil</h2>
    <Col xs={10}>
      <img className="img-auto" src="https://via.placeholder.com/120" alt="logo auto" />
    </Col>
    <Col xs={14}>
      <Row className="descrip-auto-container">
        <Col xs={12}>
          <p className="title-info">Placa</p>
          <p className="result-info">{vehicle}</p>
        </Col>
        <Col xs={12}>
          <p className="title-info">Marca</p>
          <p className="result-info">{brand ? brand : '-'}</p>
        </Col>
        <Col xs={12}>
          <p className="title-info">Modelo</p>
          <p className="result-info">{model ? model : '-'}</p>
        </Col>
        <Col xs={12}>
          <p className="title-info">¿Es cero Km?</p>
          <p className="result-info">{zeroKm ? 'Si' : 'No'}</p>
        </Col>
      </Row>
    </Col>
  </Row>
);

export default CarQuoteDescription;
