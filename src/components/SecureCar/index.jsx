import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Row, Col, Select, Radio, Checkbox, DatePicker } from 'antd';
import { connect } from 'react-redux';
import { secureCar, getCities } from '../../redux/actions';
import './secureCar.scss';

import moment from 'moment';
import 'moment/locale/es';
import locale from 'antd/es/date-picker/locale/es_ES';

const { Option } = Select;

const SecureCar = ({ secureCar, getCities, cities }) => {
  const history = useHistory();
  const [isZeroKm, setIsZeroKm] = useState(false);
  const [brand, setBrand] = useState();
  const [model, setModel] = useState();
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [identificationType, setidentificationType] = useState();
  const [genre, setgenre] = useState();
  const [address, setAddress] = useState();
  const [zeroKm, setZeroKm] = useState();
  const [city, setCity] = useState();

  const onChangeGenre = (value) => setgenre(value);
  const onChangeZeroKm = (value) => {
    setIsZeroKm(value.target.checked);
    setZeroKm(value);
  };

  useEffect(() => {
    if (!cities) getCities();
  }, []);

  const onFinish = (values) => {

    const cityName = cities.find(element => element.codigo == values.cityCode).valor;

    secureCar({
      ...values,
      zeroKm: zeroKm ? zeroKm.target.checked : false,
      birthDate: moment(values.birthDate).format('YYYY-MM-DD'),
      cityName: cityName,
    });

    const userData = {
      name: values.name,
      lastName: values.lastName,
      identificationType: values.identificationType,
      identification: values.identification,
      city: values.city,
      genre: values.genre,
      email: values.email,
      phone: values.phone,
      address: values.address,
      birthDate: moment(values.birthDate).format('YYYY-MM-DD'),
      vehicle: values.vehicle,
    };

    history.push("/quote-list", {
      state: {
        userData,
        vehicle: values.vehicle,
        model: values.model ? values.model : '',
        brand: values.brand ? values.brand : '',
        city: values.city,
        zeroKm: values.zeroKm,
      },
    });
  };

  const customQuote = () => history.push("/custom-quote");

  const disabledDate = (current) => {
    const customDate = "2004-01-01";
    return current && current > moment(customDate, "YYYY-MM-DD");
  };

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
          <Col className="zeroKm-col" xs={12} md={8}>
            <Form.Item
              name="zeroKm"
              label="¿Es cero KM?"
              valuePropName="checked"
            >
              <Checkbox onChange={onChangeZeroKm}>Si</Checkbox>
            </Form.Item>
          </Col>
          <Col xs={12} md={8}>
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
          {isZeroKm && (
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
                <Select
                showSearch
                placeholder="Selecciona por favor una marca"
                onChange={(value) => setBrand(value)}
                allowClear
                defaultValue={brand}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option key={`4601258-mazda`} value={`4601258-mazda`}>Mazda</Option>
                <Option key={`4601258-chevrolet`} value={`4601258-chevrolet`}>Chevrolet</Option>
                <Option key={`4601258-renault`} value={`4601258-renault`}>Renault</Option>
              </Select>
              </Form.Item>
            </Col>
          )}
          {isZeroKm && (
            <Col xs={24} md={8}>
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
          )}
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
              <Input onChange={(value) => setLastName(value.target.value)} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
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
                onChange={(value) => setidentificationType(value)}
                allowClear
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
              name="cityCode"
              label="Ciudad de movilización"
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              rules={[
                {
                  required: true,
                  message: 'Por favor ingresa la ciudad de movilización!',
                  whitespace: true,
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Selecciona por favor tu ciudad de movilización"
                onChange={(value) => setCity(value)}
                allowClear
                defaultValue={city}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {cities && cities.map((city) => (
                  <Option key={city.codigo} value={city.codigo}>{city.valor}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
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
              name="birthDate"
              label="Fecha de nacimiento"
              placeholder="Ej: 1968-11-26 (YYYY-MM-DD)"
              rules={[
                {
                  required: true,
                  message: 'Por favor ingresa tu fecha de nacimiento!',
                },
              ]}
            >
              <DatePicker
                locale={locale}
                format="YYYY-MM-DD"
                defaultPickerValue={moment("1990-01-01", "YYYY-MM-DD")}
                disabledDate={disabledDate}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="email"
              label="Correo electrónico"
              rules={[
                {
                  type: 'email',
                  message: 'El correo electrónico no es válido!',
                },
                {
                  required: true,
                  message: 'Por favor ingresa un correo electrónico!',
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
              defaultValue={address}
            >
              <Input onChange={(value) => setAddress(value.target.value)} />
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

const mapStateToProps = (globalState) => {
  const state = globalState.app;
  return ({
    cities: state.cities_secure_car,
  });
};

const mapDispatchToProps = {
  secureCar,
  getCities
};

export default connect(mapStateToProps, mapDispatchToProps)(SecureCar);
