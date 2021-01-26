import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Form, Input, Button, Checkbox, Row, Col, message } from 'antd';
import { connect } from 'react-redux';
import { mainInfo } from '../../redux/actions';

function Landing({ mainInfo, response }) {
  const history = useHistory();

  const onFinish = (values) => {
    mainInfo(values);
    history.push("/steps-form");
  };

  return (
    <div style={{ padding: 50 }}>
      <h1>Adquiere tu SOAT en tres simples PASOS</h1>
      <Form
        name="form_pre_soat"
        className="soat-pre-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Row>
          <Col xs={8}>
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
          <Col xs={8}>
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
          <Col xs={8}>
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
              normalize={(value) => (value || '').toUpperCase()}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  required: true,
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject('Acepta los terminos y condiciones'),
                },
              ]}
            >
              <Checkbox>
                He leído los <Link to={'agreement'}>terminos y condiciones</Link>
              </Checkbox>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Button type="primary" htmlType="submit" className="btn-submit">
              Comprar
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

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
