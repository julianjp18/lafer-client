import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Row, Col, Select, Radio, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { secureCar, getCities } from '../../redux/actions';
import './secureCar.scss';

const { Option } = Select;

function SecureCar({ secureCar, getCities, cities }) {
  const history = useHistory();
  const [brand, setBrand] = useState();
  const [model, setModel] = useState();
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [typeIdentification, settypeIdentification] = useState();
  const [genre, setgenre] = useState();
  const [address, setAddress] = useState();
  const [zeroKm, setZeroKm] = useState();
  const [city, setCity] = useState();

  const onChangeGenre = (value) => setgenre(value);
  const onChangeZeroKm = (value) => setZeroKm(value);

  console.log(cities);

  useEffect(() => {
    if (!cities) getCities();
  }, []);

  const onFinish = (values) => {
    secureCar({ ...values, zeroKm: zeroKm.target.checked });
    history.push("/quote-list", {
      state: {
        vehicle: values.vehicle,
        model: values.model,
        brand: values.brand,
        city: values.city,
        zeroKm: values.zeroKm,
      },
    });
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
              name="brand"
              label="Marca"
              rules={[
                {
                  required: true,
                  message: 'Por favor inserta la marca de tu vehiculo!',
                  whitespace: true,
                },
              ]}
              initialValue={brand}
            >
              <Input onChange={(value) => setBrand(value.target.value)} />
            </Form.Item>
          </Col>
          <Col xs={12} md={8}>
            <Form.Item
              name="model"
              label="Modelo"
              rules={[
                {
                  required: true,
                  message: 'Por favor ingresa el modelo del vehiculo!',
                  whitespace: true,
                },
                () => ({
                  validator(rule, value) {
                    const reg = /[0-9]{4}$/;
                    if (reg.exec(value)) return Promise.resolve();
                    return Promise.reject('Ingresa un año Ej: 2014.');
                  },
                }),
              ]}
              initialValue={model}
            >
              <Input onChange={(value) => setModel(value.target.value)} />
            </Form.Item>
          </Col>
          <Col xs={12} md={8}>
            <Form.Item
              name="zeroKm"
              label="¿Es cero KM?"
              valuePropName="checked"
            >
              <Checkbox onChange={onChangeZeroKm}>Si</Checkbox>
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="city"
              label="Ciudad de movilización"
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              rules={[
                {
                  //required: true,
                },
              ]}
            >
              <Select
                placeholder="Selecciona por favor tu ciudad de movilización"
                onChange={(value) => setCity(value)}
                allowClear
                defaultValue={city}
              >
                {cities && cities.map((city) => (
                  <Option value={city.codigo}>{city.valor}</Option>
                ))}
              </Select>
            </Form.Item>  
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="name"
              label="Nombres"
              rules={[
                {
                  required: true,
                  message: 'Por favor inserta tu nombre!',
                  whitespace: true,
                },
              ]}
            >
              <Input onChange={(value) => setName(value.target.value)} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
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
          <Col xs={24} md={8}>
            <Form.Item
              name="typeIdentification"
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
                onChange={(value) => settypeIdentification(value)}
                allowClear
                defaultValue={typeIdentification}
              >
                <Option value="CC">Cédula de ciudadanía</Option>
                <Option value="TI">Tarjeta Identidad</Option>
                <Option value="CE">Cédula extranjería</Option>
                <Option value="NN">Nit natural</Option>
                <Option value="NT">Nit empresa</Option>
              </Select>
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
              name="birthDate"
              label="Fecha de nacimiento"
              placeholder="Ej: 1968-11-26 (YYYY-MM-DD)"
              rules={[
                {
                  required: true,
                  message: 'Por favor inserta tu fecha de nacimiento!',
                  whitespace: true,
                },
                () => ({
                  validator(rule, value) {
                    const reg = /[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
                    if (reg.exec(value.toLowerCase())) return Promise.resolve();
                    return Promise.reject('Estructura fecha: YYYY-MM-DD');
                  },
                }),
              ]}
            >
              <Input placeholder="YYYY-MM-DD" />
            </Form.Item>
          </Col>
          <Col xs={12} md={8}>
            <Form.Item
              name="genre"
              label="Género"
              rules={[
                {
                  required: true,
                  message: 'Por favor selecciona tu género!',
                  whitespace: true,
                },
              ]}
            >
              <Radio.Group onChange={onChangeGenre} value={genre}>
                <Radio value='M'>Masculino</Radio>
                <Radio value='F'>Femenino</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={12} md={8}>
            <Form.Item
              name="phone"
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
        </Row>
        <Row>
          <Col xs={24}>
            <Button type="primary" htmlType="submit" className="btn-submit first-button">
              Cotizar
            </Button>
          </Col>
          <Col xs={24}>
            <Button type="primary" onClick={customQuote} className="btn-submit">
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
  cities: state.cities_secure_car,
});

const mapDispatchToProps = {
  secureCar,
  getCities
};

export default connect(mapStateToProps, mapDispatchToProps)(SecureCar);
