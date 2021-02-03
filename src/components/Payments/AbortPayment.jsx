import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import './payments.scss';

const AbortPayment = () => {

  return (
    <Row>
      <Col className="img-container" xs={24}>
        <img className="img" src="images/logo-large.png" alt="logo tanSeguro"/>
      </Col>
      <Col className="failure-container" xs={24}>
        <h2 className="failure-title">¡Pago abortado!</h2>
        <p>No se ha realizado tu pago, por favor inténtalo nuevamente.</p>
        <p>Muchas gracias por confiar en nosotros.</p>
        <Link className="btn btn-failure" to={''}>Finalizar</Link>
      </Col>
    </Row>
  )
};

export default AbortPayment;
