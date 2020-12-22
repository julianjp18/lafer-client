import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Form, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';

function SecondForm() {
  const [user, updateUser] = useState("");
  const history = useHistory();

  const onFinish = (values) => {
    history.push("/second");
  };

  return (
    <div style={{ padding: 50 }}>
      <h1>Inicio</h1>
      <Form
        name="normal_login"
        className="soat-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Row>
          <Col></Col>
          <Col>
            <Form.Item
              name="identification"
              label="Número de identificación"
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
          <Col>
            <Form.Item
              name="name"
              label="Nombre"
              rules={[
                {
                  required: true,
                  message: 'Por favor inserta tu nombre!',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item
              name="lastName"
              label="Apellidos"
              rules={[
                {
                  required: true,
                  message: 'Por favor inserta tus apellidos!',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="email"
              label="E-mail"
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
          <Col>
            <Form.Item
              name="city"
              label="Ciudad"
              rules={[
                {
                  required: true,
                  message: 'Por favor ingresa la ciudad!',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item
              name="address"
              label="Dirección"
              rules={[
                {
                  required: true,
                  message: 'Por favor ingresa la dirección!',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="phoneNumber"
              label="Phone"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone!',
                },
                () => ({
                  validator(rule, value) {
                    const reg = /[0-9]{10}$/;
                    if (reg.exec(value)) return Promise.resolve();
                    return Promise.reject('Por favor ingresar tu número celular. Ej:1234567890');
                  },
                }),

              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Siguiente
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(SecondForm);