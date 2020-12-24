import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Row, Col, Button, Card, Modal } from 'antd';
import { connect } from 'react-redux';

function ThirdForm({ prev, success }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: 50 }}>
      <h1>Inicio</h1>
      <Row>
        <Col xs={12}>
          <h2>Confirma tu compra</h2>
          <p>¿Cuentas con un cupón de descuento?, ingrésalo a continuación.</p>
          <Form.Item
            name="cupon"
            label="Cupón"
            rules={[
              {
                required: false,
                message: 'Por favor inserta tu cupón!',
                whitespace: false,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={12}>
          {success && (
            <>
              <Card title="¡Adquiere el SOAT para tu vehiculo!" style={{ margin: '20px 20px' }}>
                <p>Vigencia de tu SOAT:</p>
                <h3>A partir del 24/12/2018 hasta el 25/12/2021</h3>
                <Button type="primary" onClick={showModal}>
                  Proceder al pago
                </Button>
              </Card>
            </>
          )}
          <Modal title="SECCIÓN DE PASARELA DE PAGO" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>Los siguientes pasos corresponden a la pasarela de pagos.</p>
            <p>Hasta AQUÍ llega el demo.</p>
            <p>Gracias.</p>
          </Modal>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Volver
          </Button>
        </Col>
        <Col>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Comprar
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(ThirdForm);