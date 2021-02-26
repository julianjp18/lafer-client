import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { mainInfo } from '../../redux/actions';
import './soat.scss';
import CarQuoteDescription from './CarQuoteDescription';

const fakeCar = {
  vehicle: 'KUJ123',
  brand:'KIA Picanto',
  model: '2020',
  cylinderCapacity: '2000',
  name: 'Julian David Perez Forero',
};

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
  },
};

function Soat({ mainInfo, response }) {
  const history = useHistory();
  const [emptyError, setemptyError] = useState(false);

  const onFinish = (values) => {

    if (values.email && values.phone) {
      setemptyError(false);
      mainInfo(values);
      history.push("/bonus-soat");
    } else {
      setemptyError(true);
    }

  };

  return (
    <div className="soat-main-container">
      <div className="soat-main-content">
        <CarQuoteDescription
          vehicle={fakeCar.vehicle}
          brand={fakeCar.brand}
          model={fakeCar.model}
          cylinderCapacity={fakeCar.cylinderCapacity}
          name={fakeCar.name}
          isFirstForm
        />
        <div className="main-text">
          <p className="text">
            Este es el precio de tu SOAT <b>sin el bono de descuento</b>
          </p>
        </div>
        <Row className="show-secure-container">
          <Col xs={18}>
              <p className="secure-text">SOAT Seguros Mundial</p>
              <p className="secure-value">Costo: $ 556.000</p>
            </Col>
            <Col xs={6}>
              <div className="img-secure-content">
                <img src={'/images/secures_logos/seguros-mundial.png'} alt="secure" className="img-secure" />
              </div>
            </Col>
        </Row>
        <div className="main-text-second">
          <p className="text">
            Para calcular tu bono de descuento, requerimos los siguientes datos
          </p>
        </div>
        <Row className="form-container">
          <Form
            layout={'vertical'}
            name="control-ref"
            onFinish={onFinish}
            scrollToFirstError
            {...formItemLayout}
          >
            <Col xs={24}>
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
            <Col xs={24}>
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
            <Form.Item>
              <Button className="btn-submit" type="primary" htmlType="submit">
                Quiero mi bono
              </Button>
              {emptyError && (
                <p className="warning-text">Para continuar, ingresa tus dato</p>
              )}
            </Form.Item>
          </Form>
        </Row>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Soat);
