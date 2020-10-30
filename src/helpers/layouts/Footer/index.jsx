import React from 'react';
import { Col, Row } from 'antd';
import './footer.scss';

const Footer = () => (
  <Row className="footer">
    <Col className="menu-footer-list" xs={8}>
        <p className="footer-menu-item">SOAT</p>
        <p className="footer-menu-item">Renta</p>
        <p className="footer-menu-item">Tecnología</p>
    </Col>
    <Col className="info-container" xs={8}>
        <p>Para más información escríbenos a: <b>test@soporte.com</b></p>
    </Col>
    <Col xs={8}>
        <div className="logo-footer" />
    </Col>
    <Col xs={24}>
        <div className="privacy-container">
            <p>Política de privacidad y seguridad. - Términos y condiciones</p>
            <p>LAFER 2020. Todos los derechos reservados.</p>
        </div>
    </Col>
  </Row>
);

export default Footer;