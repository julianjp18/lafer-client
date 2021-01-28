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
  const showModal = () => {
    var form = document.createElement('form');
    document.body.appendChild(form);
    form.method = 'post';
    form.action = "https://demover3-1.tucompra.net/tc/app/inputs/compra.jsp";
    var inputBillNumber = document.createElement('input');
    var inputBillValue = document.createElement('input');
    var inputBillDescription = document.createElement('input');
    var inputBillIdUser = document.createElement('input');
    
    inputBillNumber.type = 'hidden';
    inputBillNumber.name = "factura";
    inputBillNumber.id = "factura";
    inputBillNumber.value = billNumber;
    
    inputBillValue.type = 'hidden';
    inputBillValue.name = "valor";
    inputBillValue.id = "valor";
    inputBillValue.value = billValue;
    
    inputBillDescription.type = 'hidden';
    inputBillDescription.name = "descripcionFactura";
    inputBillDescription.id = "descripcionFactura";
    inputBillDescription.value = `Compra seguro para auto ${billNumber}, ${billValue}`;

    inputBillIdUser.type = 'hidden';
    inputBillIdUser.name = "usuario";
    inputBillIdUser.id = "usuario";
    inputBillIdUser.value = 'i96td5084822950k';
    
    form.appendChild(inputBillNumber);
    form.appendChild(inputBillValue);
    form.appendChild(inputBillDescription);
    form.appendChild(inputBillIdUser);
    form.submit();
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
