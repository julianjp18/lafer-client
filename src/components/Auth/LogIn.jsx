import React, { useState } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import {  Form, Input, Button  } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { signIn } from '../../redux/actions';
import { connect } from 'react-redux';

function LogIn({ signIn, auth }) {
  const history = useHistory();

  const onFinish = (values) => {
    signIn(values);
    if (auth) {
      localStorage.setItem("user", auth);
      history.push("/app");
    }
  };

  return (
    <div style={{ padding: 50 }}>
      <h1>Iniciar sesión</h1>
      <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Usuario"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
        hasFeedback
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Contraseña"
        />
      </Form.Item>
      <Form.Item>
        <Link to={'forgot-password'}>Olvidó contraseña?</Link>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Iniciar sesión
        </Button>
        <Link to={'sign-up'}>Registrarse</Link>
      </Form.Item>
    </Form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  signIn: signIn,
};
  
export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
