import React from 'react';
import { Row, Col } from "antd";
import './footer.scss';

const Footer = ({}) => (
  <Row className="footer-container">
    <Col className="footer-info-content gray-right-line" xs={24} md={6}>
      <h2>Lafer Soluciones Masivas de Seguros</h2>  
      <p>NIT 900.176.872-6</p>
      <p>Calle 23 Norte # 5N 21</p>
      <p>Teléfono: +57 2 4858528</p>
      <p>Email: soporte@siendoseguro.com</p>
    </Col>
    <Col className="gray-right-line" xs={24} md={8}>
      <div className="terms-container">
        <p className="terms">Conoce nuestra política de tratamiento de datos - <a href="#">Términos y condiciones</a></p>
      </div>
    </Col>
    <Col className="gray-right-line" xs={24} md={7}>
      <Row className="payment-container">
        <Col xs={24}>
          <p>Métodos de pago</p>
        </Col>
        <Col xs={8}>
          <img className="payment-img mastercard" src={'/images/footer/mastercard-w.svg'} alt="mastercard"/>
        </Col>
        <Col xs={8}>
          <img className="payment-img visa" src={'/images/footer/visa-w.svg'} alt="visa"/>
        </Col>
        <Col xs={8}>
          <img className="payment-img pse" src={'/images/footer/pse.png'} alt="pse"/>
        </Col>
      </Row>
    </Col>
    <Col xs={24} md={3}>
      <div className="social">
        <p>Síguenos en:</p>
        <a href="#" className="social-item">
        <img className="social-img facebook" src={'/images/footer/facebook.svg'} alt="facebook"/>
        </a>
      </div>
    </Col>
  </Row>
);

export default Footer;
