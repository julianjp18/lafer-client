import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Row, Col } from 'antd';
import { createCountry, deleteCountry, updateCountry } from '../../../redux/actions';
import './addForm.scss';

function CountryForm({ updateForm, deleteForm }) {
  const history = useHistory();

  const onFinish = (values) => {
    if (updateForm) updateCountry(values);
    else if (deleteForm) deleteCountry(values);
    else createCountry(values);
    
    history.push("/");
  };

  return (
    <Form
      name="add-form"
      className="add-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Row>
        <Col xs={8}>
          <Form.Item
            name="countryId"
            label="id del País"
            labelCol={{
              span: 10,
            }}
            wrapperCol={{
              span: 14,
            }}
            rules={[
              {
                required: true,
                message: 'Inserta id',
                whitespace: true,
              },
              () => ({
                validator(rule, value) {
                  const reg = /[0-9]{2,10}$/;
                  if (reg.exec(value)) return Promise.resolve();;
                  return Promise.reject('Mínimo 2 números, máximo 10.');
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={8}>
          <Form.Item
            name="countryName"
            label="Nombre país"
            placeholder="Ej: Polombia"
            rules={[
              {
                required: true,
                message: 'Por favor inserta nombre de país!',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <Button type="primary" htmlType="submit" className="btn-submit">
            Agregar
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default CountryForm;
