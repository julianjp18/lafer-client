import React, { useState } from "react";
import { Form, Input, Row, Col, Button, Card, Modal } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

function ThirdForm({
  prev,
  success,
  currentQuote,
  endDate,
  billNumber,
  billValue,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    //document.getElementById('tu-compra-form').submit();
  };

  const onClickForm = () => {
    document.getElementById('tu-compra-form').submit();
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
                <h3>
                  {`A partir del ${moment(currentQuote, 'yyyy-mm-dd').format('YYYY/MM/DD')} hasta el ${moment(endDate, 'yyyy-mm-dd').format('YYYY/MM/DD')}`}
                </h3>
                <Button type="primary" onClick={showModal}>
                  Proceder al pago
                </Button>
              </Card>
            </>
          )}
          <Modal title="SECCIÓN DE PASARELA DE PAGO" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <form id="tu-compra-form" method="POST" action="https://demover3-1.tucompra.net/tc/app/inputs/compra.jsp">
              <input name="factura" id="factura" type="number" value={billNumber} /><br/>
              <input name="valor" id="valor" type="number" value={billValue} /><br/>
              <input name="descripcionFactura" id="descripcionFactura" type="text" value={`Compra seguro para auto`} /><br/>
              <input name="usuario" type="hidden" value="i96td5084822950k"/>
              <input type="button" id="tu-compra-btn" onClick={onClickForm} value="Enviar"/>
            </form>
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
