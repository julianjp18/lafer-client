import React from 'react';
import { Row, Col } from "antd";
import './footer.scss';

const Footer = ({}) => (
  <Row className="footer-container">
    <Col xs={24} md={12}>
      <h2>Bogotá, Colombia</h2>  
      <p>Calle 105 # 33 - 23</p>
      <p>+57 1 435 56 96</p>
      <p>email@gmail.com</p>
    </Col>
    <Col xs={24} md={12}>
      <div className="social">
        <a href="#" className="social-item"><i className="fab fa-facebook"></i></a>
        <a href="#" className="social-item"><i className="fab fa-twitter"></i></a>
        <a href="#" className="social-item"><i className="fab fa-instagram"></i></a>
        <a href="#" className="social-item"><i className="fab fa-whatsapp"></i></a>
      </div>
    </Col>
  </Row>
);

export default Footer;
