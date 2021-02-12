import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Form, Button, Row, Col, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { mainInfo } from '../../../redux/actions';
import './customQuote.scss';

function CustomQuote({ mainInfo, response }) {
  const history = useHistory();

  const onFinish = (values) => {
    mainInfo(values);
    history.push("/steps-form");
  };

  const onChangeFirstCheckbox = (value) => {

  };

  const onChangeSecondCheckbox = (value) => {

  };

  return (
    <div style={{ padding: 50 }}>
      <h1>Buscador personalizado</h1>
      <p>Con esta serie de preguntas podremos encontrar el seguro que más se ajusta a tus necesidades.</p>
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
            <p>Selecciona la frecuencia con la que usas tu automóvil</p>
            <Checkbox.Group style={{ width: '100%' }} onChange={onChangeFirstCheckbox}>
              <Row>
                <Col xs={24} span={8}>
                  <Checkbox value="weekend">Solo fines de semana</Checkbox>
                </Col>
                <Col xs={24} span={8}>
                  <Checkbox value="week">A diario de lunes a viernes</Checkbox>
                </Col>
                <Col xs={24} span={8}>
                  <Checkbox value="everyday">Todos los dias</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Col>
          <Col xs={24} md={8}>
            <p className="second-description">¿Cuántas veces usas el conductor elegido al año</p>
            <Checkbox.Group style={{ width: '100%' }} onChange={onChangeSecondCheckbox}>
              <Row>
                <Col xs={24} span={8}>
                  <Checkbox value="oneToSix">1 a 6 veces</Checkbox>
                </Col>
                <Col xs={24} span={8}>
                  <Checkbox value="oneToTwelve">1 a 12 veces</Checkbox>
                </Col>
                <Col xs={24} span={8}>
                  <Checkbox value="moreTwelve">Más de 12</Checkbox>
                </Col>
                <Col xs={24} span={8}>
                  <Checkbox value="almostNever">Casi nunca</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            <Button type="primary" htmlType="submit" className="btn-submit first-button">
              Buscar
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
    response: state.response,
  });
};

const mapDispatchToProps = {
  mainInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomQuote);
