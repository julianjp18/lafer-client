import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import './payments.scss';

const PendingPayment = () => {

  return (
    <Row>
      <Col className="img-container" xs={24}>
        <img className="img" src="images/logo-large.png" alt="logo tanSeguro"/>
      </Col>
      <Col className="pending-container" xs={12}>
        <h2 className="pending-title">¡Pago pendiente!</h2>
        <p>Se ha realizado tu pago, pero se encuentra en verificación con nuestra pasarela de pagos.</p>
        <p>Muchas gracias por confiar en nosotros.</p>
        <Link className="btn btn-pending" to={''}>Finalizar</Link>
      </Col>
    </Row>
  )
};

export default PendingPayment;
