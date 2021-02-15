import React, { useState } from "react";
import { Form, Input, Row, Col, Button, Select } from 'antd';

const { Option } = Select;

function SecondForm({ next, prev, clientInfo, response, idLeadSharp }) {
  const clientData = localStorage.getItem('client-data-soat') ? JSON.parse(localStorage.getItem('client-data-soat')) : {};
  const [identificationType, setIdentificationType] = useState(clientData.identificationType);
  const [name, setName] = useState(clientData.name);
  const [lastName, setLastName] = useState(clientData.lastName);
  const [email, setEmail] = useState(clientData.email);
  const [address, setAddress] = useState(clientData.address);
  const [city, setCity] = useState(clientData.city);
  const [identification, setIdentification] = useState(clientData.identification);
  const [phoneNumber, setPhoneNumber] = useState(clientData.movil);

  const nextSubmit = () => {
    const clientData = {
      identificationType,
      phoneNumber,
      name,
      lastName,
      email,
      address,
      city,
      identification,
      idLeadSharp,
    };

    clientInfo(clientData);
    next();
  };

  return (
    <div style={{ padding: 50 }}>
      <h1>Tu información</h1>
      <Row>
        <Col xs={8}>
          <Form.Item
            name="identificationType"
            label="Tipo de identificación"
            labelCol={{
              span: 10,
            }}
            wrapperCol={{
              span: 14,
            }}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Selecciona por favor un tipo de identificación"
              onChange={(value) => setIdentificationType(value)}
              allowClear
              defaultValue={identificationType}
            >
              <Option value="cc">Cédula de ciudadanía</Option>
              <Option value="passport">Pasaporte</Option>
              <Option value="other">Otro</Option>
            </Select>
          </Form.Item>
        </Col>
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
            <Input defaultValue={identification} onChange={(value) => setIdentification(value.target.value)} />
          </Form.Item>
        </Col>
        <Col xs={8}>
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
            <Input defaultValue={name} onChange={(value) => setName(value.target.value)} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
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
            <Input defaultValue={lastName} onChange={(value) => setLastName(value.target.value)} />
          </Form.Item>
        </Col>
        <Col xs={8}>
          <Form.Item
            name="email"
            label="Correo electrónico"

            rules={[
              {
                type: 'email',
                message: 'Ingresa correctamente un correo eletrónico!',
              },
              {
                required: true,
                message: 'Por favor inserta un correo electrónico!',
              },
            ]}
          >
            <Input defaultValue={email} onChange={(value) => setEmail(value.target.value)} />
          </Form.Item>
        </Col>
        <Col xs={8}>
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
            <Input defaultValue={city} onChange={(value) => setCity(value.target.value)} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
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
            <Input defaultValue={address} onChange={(value) => setAddress(value.target.value)} />
          </Form.Item>
        </Col>
        <Col xs={8}>
          <Form.Item
            name="phoneNumber"
            label="Celular"
            rules={[
              {
                required: true,
                message: 'Por favor ingresa tu celular!',
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
            <Input defaultValue={phoneNumber} onChange={(value) => setPhoneNumber(value.target.value)} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col offset={10} xs={2}>
          <div className="steps-action">
            <Button type="primary" onClick={nextSubmit}>
              Siguiente
            </Button>
          </div>
        </Col>
        <Col xs={12}>
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Volver
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default SecondForm;
