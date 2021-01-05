import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Form, Input, Button, Checkbox, Row, Col, message } from 'antd';
import { connect } from 'react-redux';
import { mainInfo } from '../../redux/actions';
import './secureCar.scss';

function SecureCar({ mainInfo, response }) {
  const history = useHistory();

  const onFinish = (values) => {
    mainInfo(values);
    history.push("/quote-list");
  };

  const customQuote = () => history.push("/custom-quote");

  return (
    <div style={{ padding: 50 }}>
      <h1>¡Cotiza tu seguro!</h1>
      <Form
        name="secure_car_form"
        className="secure_car_form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Row>
          <Col xs={24} md={8}>
            <Form.Item
              name="vehicle"
              label="Placas del vehiculo"
              placeholder="Ej: ABC123"
              rules={[
                {
                  required: true,
                  message: 'Por favor inserta la placa del vehiculo!',
                  whitespace: true,
                },
                () => ({
                  validator(rule, value) {
                    const reg = /[a-z]{3}[0-9]{3}[a-z]?$/;
                    if (reg.exec(value.toLowerCase())) return Promise.resolve();
                    return Promise.reject('Structure of plate: XXX123 ó AAA11A');
                  },
                }),
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="identification"
              label="Número de identificación"
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              rules={[
                {
                  required: true,
                  message: 'Inserta tu número de identificación!',
                  whitespace: true,
                },
                () => ({
                  validator(rule, value) {
                    const reg = /[0-9]{6,10}$/;
                    if (reg.exec(value)) return Promise.resolve();;
                    return Promise.reject('Mínimo 6 números, máximo 10.');
                  },
                }),
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="email"
              label="Correo electrónico"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="phone"
              label="Celular"
              rules={[
                {
                  required: true,
                  message: 'Por favor inserta un celular!',
                  whitespace: true,
                },
                () => ({
                  validator(rule, value) {
                    const reg = /[0-9]{10}$/;
                    if (reg.exec(value)) return Promise.resolve();;
                    return Promise.reject('Estructura del telefono: 1234567890');
                  },
                }),
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            <Button type="primary" htmlType="submit" className="btn-submit first-button">
              Cotizar
            </Button>
          </Col>
          <Col xs={24}>
            <Button type="primary" onCLick={customQuote} className="btn-submit">
              Cotización personalizada
            </Button>
          </Col>
        </Row>
        <Form.Item>
        </Form.Item>
      </Form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  response: state.response,
});

const mapDispatchToProps = {
  mainInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(SecureCar);
