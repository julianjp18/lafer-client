import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Form, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';

function Landing() {
  const [user, updateUser] = useState("");
  const history = useHistory();

  const onFinish = (values) => {
    history.push("/second");
  };

  return (
    <div style={{ padding: 50 }}>
      <h1>Inicio</h1>
      <Form
        name="normal_login"
        className="soat-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          label="E-mail"
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
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            {
              required: true,
              message: 'Please input your phone!',
              whitespace: true,
            },
            () => ({
              validator(rule, value) {
                const reg = /[0-9]{10}$/;
                if(reg.exec(value)) return  Promise.resolve();;
                return  Promise.reject('Structure of phone: 1234567890');
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="vehicle"
          label="Placas del vehiculo"
          rules={[
            {
              required: true,
              message: 'Please input your vehicle plate!',
              whitespace: true,
            },
            () => ({
              validator(rule, value) {
                const reg = /[A-Z]{3}-[0-9]{3}$/;
                if(reg.exec(value)) return  Promise.resolve();;
                return  Promise.reject('Structure of plate: XXX-123');
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              required: true,
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject('Should accept agreement'),
            },
          ]}
        >
          <Checkbox>
            I have read the <Link to={'agreement'}>agreement</Link>
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Validate
        </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(Landing);