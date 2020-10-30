import React from 'react';
import { Row, Col } from 'antd';
import Users from '../../resources/images/users.png';

const WeAre = () => {
  return (
    <Row className="weare-container">
      <Col className="weare-col" xs={24}>
        <h2>¿QUIENES SOMOS?</h2>
      </Col>
      <Col className="weare-col" xs={24}>
        <p>
          Lorem Ipsum is <b>simply dummy text</b> of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
           and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </Col>
      <Row className="sections-container">
        <Col xs={6}>
          <div className="section-container">
            <img src={Users} alt="users" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>
        </Col>
        <Col xs={6}>
          <div className="section-container">
            <img src={Users} alt="users" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>
        </Col>
        <Col xs={6}>
          <div className="section-container">
            <img src={Users} alt="users" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>
        </Col>
        <Col xs={6}>
          <div className="section-container last-section-container">
            <img src={Users} alt="users" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>
        </Col>
      </Row>
    </Row>
  );
}

export default WeAre;
