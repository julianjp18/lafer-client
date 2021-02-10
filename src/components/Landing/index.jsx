import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Row, Col, Carousel } from 'antd';
import { connect } from 'react-redux';
import { mainInfo } from '../../redux/actions';
import './landing.scss';
import CarouselSecures from "./CarouselSecures";

function Landing({ mainInfo, response }) {
  const history = useHistory();

  const onFinish = (values) => {
    mainInfo(values);
    history.push("/steps-form");
  };

  const contentStyle = {
    height: '85vh',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  return (
    <div className="landing-container">
      <Carousel dotPosition='top'>
        <div className="carousel-item">
          <div className="title-container">
            <Row>
              <Col xs={24} md={10}>
                <p>
                  <strong>Tan fácil </strong>
                  que puedes asegurar tu vehículo en solo 3 pasos...
                </p>
                <div className="btn-container">
                  <Button className="carousel-main-btn">Cotizar</Button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="carousel-item">
          <h3 style={contentStyle}>2</h3>
        </div>
        <div className="carousel-item">
          <h3 style={contentStyle}>3</h3>
        </div>
        <div className="carousel-item">
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
      <div className="carousel-secures-container">
        <CarouselSecures />
      </div>
      <Row className="us-container">
        <Col className="us-description-col" xs={24} md={12}>
          <h1 className="us-title">¿Qué es <span className="company-name">Tan Seguro?</span></h1>
          <p className="us-description">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
          </p>
        </Col>
        <Col xs={24} md={12}>
          <img src="https://via.placeholder.com/300x200.png/F67411/FFFFFF?text=Image+Tan+Seguro" alt="fl"/>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (globalState) => {
  const state = globalState.app;
  return ({
    response: state.response,
  });
};

const mapDispatchToProps = {
  mainInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
