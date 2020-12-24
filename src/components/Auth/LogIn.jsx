import React, { useState } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import {  Form, Input, Button  } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { signIn } from '../../redux/actions';
import { connect } from 'react-redux';

function LogIn({ signIn }) {
  const [user, updateUser] = useState("");
  const history = useHistory();

  const onFinish = (values) => {
    updateUser(user.username);
    signIn(values);
    localStorage.setItem("user", user);
    history.push("/app");
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
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Link to={'forgot-password'}>Forgot password</Link>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        <Link to={'sign-up'}>Register Now!</Link>
      </Form.Item>
    </Form>
    </div>
  );
}

const mapDispatchToProps = {
    signIn: signIn,
  };
  
  export default connect(null, mapDispatchToProps)(LogIn);