import React, { useEffect, useState } from "react";
import { Form, Input, Row, Col, Select, Radio, Card, Button, message, Spin } from 'antd';
import { connect } from 'react-redux';

const { Option } = Select;

function FirstForm({ next, vehicleInfo, response }) {
  const [typeVehicle, setTypeVehicle] = useState();
  const [line, setLine] = useState(response && response.line);
  const [classVehicle, setClassVehicle] = useState(response && response.class);
  const [model, setModel] = useState(response && response.model);
  const [plate, setPlate] = useState(response && response.placa);
  const [brand, setBrand] = useState(response && response.brand);

  useEffect(() => {
    if (response) {
      setLine(response.line);
      setClassVehicle(response.class);
      setModel(response.model);
      setPlate(response.placa);
      setBrand(response.brand);
    }
  }, [response]);

  const nextSubmit = () => {
    const vehicleData = {
      typeVehicle,
      line,
      classVehicle,
      model,
      plate,
      brand,
    };

    vehicleInfo(vehicleData);
    next();
  };

  return response ? (
    <div style={{ padding: 50 }}>
      <h1>Información de tu vehiculo</h1>
      <p>Revisa que este sea la información de tu vehiculo, recuerda que el SOAT no se puede anular</p>
      <>
        <Row>
          <Col xs={8}>
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
              <Input value={brand} onChange={(value) => setBrand(value.target.value)} />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              name="typeVehicle"
              label="Clase vehiculo"
              rules={[
                {
                  required: true,
                },
              ]}
              initialValue={classVehicle}
            >
              <Select
                placeholder="tipo de clase de vehiculo"
                onChange={(value) => setClassVehicle(value)}
                allowClear
              >
                <Option value="SUV">Automóvil</Option>
                <Option value="MOTO">Moto</Option>
                <Option value="TRUCK">Camión</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              name="line"
              label="Línea"
              rules={[
                {
                  required: true,
                  message: 'Por favor inserta la línea de tu vehiculo!',
                  whitespace: true,
                },
              ]}
              initialValue={line}
            >
              <Input onChange={(value) => setLine(value.target.value)} />
            </Form.Item>
          </Col>
          <Col xs={8}>
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
          <Col xs={8}>
            <Form.Item
              name="vehicle"
              label="Placas del vehiculo"
              placeholder="Ej: ABC-123"
              rules={[
                {
                  required: true,
                  message: 'Por favor inserta la placa del vehiculo!',
                  whitespace: true,
                },
                () => ({
                  validator(rule, value) {
                    const reg = /[A-Z]{3}-[0-9]{3}$/;
                    if (reg.exec(value)) return Promise.resolve();
                    return Promise.reject('Structure of plate: XXX-123');
                  },
                }),
              ]}
              initialValue={plate}
            >
              <Input defaultValue={plate} onChange={(value) => setPlate(value.target.value)} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            <Form.Item
              name="selectVehicle"
              label="Tipo de vehiculo"
              labelCol={{
                span: 3,
              }}
              wrapperCol={{
                span: 21,
              }}
              rules={[
                {
                  required: true,
                  message: 'Por favor selecciona tu tipo de vehiculo!',
                },
              ]}
            >
              <Radio.Group defaultValue={typeVehicle} onChange={(value) => setTypeVehicle(value.target.value)}>
                <Row>
                  <Col xs={24}>
                    {classVehicle === "MOTO" && (
                      <Card className="card-item" title="Motocicleta" style={{ width: 200 }}>
                        <Radio value="425000">$ 425.000 COP</Radio>
                        <p></p>
                      </Card>
                    )}
                    {classVehicle === "SUV" && (
                      <Card title="Automóvil" style={{ width: 200 }}>
                        <Radio value="425000">$ 425.000 COP</Radio>
                        <p></p>
                      </Card>
                    )}
                    {classVehicle === "TRUCK" && (
                      <Card title="Camión" style={{ width: 200 }}>
                        <Radio value="700000">$ 700.000 COP</Radio>
                        <p></p>
                      </Card>
                    )}
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>
            <Row>
              <Col xs={20} offset={4}>
                <div className="steps-action">
                  <Button type="primary" onClick={nextSubmit}>
                    Siguiente
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    </div>
  ): (
    <div className="spin-container">
      <Spin tip="Cargando..." size="large"/>
    </div>
  );
}

const mapStateToProps = (state) => ({
  responseState: state.response,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FirstForm);
