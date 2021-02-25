import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Row, Col, Carousel, Input, Select, Button, Modal } from 'antd';
import { connect } from 'react-redux';
import { mainInfo } from '../../redux/actions';
import './landing.scss';

const { Option } = Select;

function Landing({ mainInfo, response }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const history = useHistory();

  const onFinish = (values) => {
    mainInfo(values);
    history.push("/steps-form");
  };

  const onBonusChange = (value) => {

  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="landing-container">
      <Carousel autoplay speed="2500" infinite autoplaySpeed="100">
        <div className="carousel-item item-1" />
        <div className="carousel-item item-2" />
      </Carousel>
      <div className="main-form-container">
        <Row>
          <Col xs={24} md={24}>
            <div className="form-soat-container desktop-form">
              <p className="title-form">Cotiza rápido y seguro aquí</p>
              <Form name="control-ref" onFinish={onFinish}>
                <Form.Item
                  name="vehicle"
                  rules={[
                    {
                      required: true,
                      message: 'Para continuar, ingresa la placa de tu vehículo.',
                    },
                    () => ({
                      validator(rule, value) {
                        const reg = /[a-z]{3}[0-9]{3}[a-z]?$/;
                        if (reg && reg.exec(value.toLowerCase())) return Promise.resolve();
                        return Promise.reject('Parece que hubo un error, ingresa una placa válida.');
                      },
                    }),
                  ]}
                  normalize={(value) => (value || '').toUpperCase()}
                >
                  <Input placeholder="Ingresa la placa" />
                </Form.Item>
                <Form.Item
                  name="bonus"
                  rules={[
                    {
                      required: true,
                      message: 'No te quedes sin tu bono, selecciona una opción para continuar.',
                    },
                  ]}
                >
                  <Select
                    placeholder="Selecciona tu bono regalo"
                    onChange={onBonusChange}
                    allowClear
                  >
                    <Option value="lifemiles">
                      <Row>
                        <Col xs={2}>
                          <img className="img-select-item" src={'/images/plane.svg'} alt="plane"/>
                        </Col>
                        <Col xs={22}>
                          <p className="select-item">Millas LifeMiles</p>
                        </Col>
                      </Row>
                    </Option>
                    <Option value="discount">
                      <Row>
                        <Col xs={2}>
                          <img className="img-select-item-dollar" src={'/images/dollar.svg'} alt="plane"/>
                        </Col>
                        <Col xs={22}>
                          <p className="select-item">Descuento de hasta $ 77.000</p>
                        </Col>
                      </Row>
                    </Option>
                  </Select>
                </Form.Item>
                <Form.Item extra={(
                  <p className="extra-info">
                    Al continuar aceptas nuestros <a className="btn-terms" onClick={showModal}>términos y condiciones & póliticas de privacidad</a> para el tratamiento de tus datos.
                  </p>
                )}>
                  <Button className="btn-submit" type="primary" htmlType="submit">
                    Cotiza SOAT gratis
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
      <Modal
        title="Términos y condiciones"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <div className="footer-modal-container">
            <Button className="back-btn" type="primary" key="back" onClick={handleCancel}>
              Volver
            </Button>
          </div>,
        ]}
      >
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem facere nulla sapiente perspiciatis laboriosam saepe mollitia, at consequatur officia doloremque commodi aliquid veritatis. Magni cumque modi earum iure nostrum totam.
        </p>
      </Modal>
      <Row>
          <Col xs={24} md={24}>
            <div className="form-soat-container mobile-form">
              <p className="title-form">Cotiza rápido y seguro aquí</p>
              <Form name="control-ref" onFinish={onFinish}>
                <Form.Item
                  name="vehicle"
                  rules={[
                    {
                      required: true,
                      message: 'Para continuar, ingresa la placa de tu vehículo.',
                    },
                    () => ({
                      validator(rule, value) {
                        const reg = /[a-z]{3}[0-9]{3}[a-z]?$/;
                        if (reg && reg.exec(value.toLowerCase())) return Promise.resolve();
                        return Promise.reject('Parece que hubo un error, ingresa una placa válida.');
                      },
                    }),
                  ]}
                  normalize={(value) => (value || '').toUpperCase()}
                >
                  <Input placeholder="Ingresa la placa" />
                </Form.Item>
                <Form.Item
                  name="bonus"
                  rules={[
                    {
                      required: true,
                      message: 'No te quedes sin tu bono, selecciona una opción para continuar.',
                    },
                  ]}
                >
                  <Select
                    placeholder="Selecciona tu bono regalo"
                    onChange={onBonusChange}
                    allowClear
                  >
                    <Option value="lifemiles">
                      <Row>
                        <Col xs={2}>
                          <img className="img-select-item" src={'/images/plane.svg'} alt="plane"/>
                        </Col>
                        <Col xs={22}>
                          <p className="select-item">Millas LifeMiles</p>
                        </Col>
                      </Row>
                    </Option>
                    <Option value="discount">
                      <Row>
                        <Col xs={2}>
                          <img className="img-select-item-dollar" src={'/images/dollar.svg'} alt="plane"/>
                        </Col>
                        <Col xs={22}>
                          <p className="select-item">Descuento de hasta $ 77.000</p>
                        </Col>
                      </Row>
                    </Option>
                  </Select>
                </Form.Item>
                <Form.Item extra={(
                  <p className="extra-info">
                    Al continuar aceptas nuestros <a className="btn-terms" onClick={showModal}>términos y condiciones & póliticas de privacidad</a> para el tratamiento de tus datos.
                  </p>
                )}>
                  <Button className="btn-submit" type="primary" htmlType="submit">
                    Cotiza SOAT gratis
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      <Row className="us-container">
        <Col className="us-description-col" xs={24} md={12}>
          <h1 className="us-title">¿Quienes <span className="company-name">Somos?</span></h1>
          <p className="us-description">
            Somos intermediarios con más de 40 años de experiencia, líderes en mercadeo masivo de seguros y microseguros. Entregamos soluciones a la medida, excelente servicio al cliente y manejamos todos los riesgos para que tus intereses estén bien asegurados.
          </p>
        </Col>
        <Col xs={24} md={12}>
          <img src="https://via.placeholder.com/300x200.png/F67411/FFFFFF?text=Image+Siendo+Seguro" alt="fl"/>
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
