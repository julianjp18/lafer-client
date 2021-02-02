import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import './payments.scss';

const FailurePayment = () => {

  return (
    <Row>
      <Col className="img-container" xs={24}>
        <img className="img" src="images/logo-large.png" alt="logo tanSeguro"/>
      </Col>
      <Col className="failure-container" xs={12}>
        <h2 className="failure-title">¡Pago Rechazado!</h2>
        <p>No se ha realizado tu pago, por favor inténtalo nuevamente.</p>
        <p>Muchas gracias por confiar en nosotros.</p>
        <Link className="btn btn-danger" to={''}>Finalizar</Link>
      </Col>
    </Row>
  )
};

export default FailurePayment;
