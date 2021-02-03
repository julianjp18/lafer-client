import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import './payments.scss';

const SuccessPayment = () => {

  return (
    <Row>
      <Col className="img-container" xs={24}>
        <img className="img" src="images/logo-large.png" alt="logo tanSeguro"/>
      </Col>
      <Col className="success-container" xs={24}>
        <h2 className="success-title">¡Felicitaciones!</h2>
        <p>Se ha realizado tu pago éxitosamente</p>
        <p>Muchas gracias por confiar en nosotros.</p>
        <Link className="btn btn-success" to={''}>Finalizar</Link>
      </Col>
    </Row>
  )
};

export default SuccessPayment;
