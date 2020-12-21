import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { signInNotifier } from '../../redux/sagas/auth/actions/signIn';
import { func, string } from 'prop-types';
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import './auth.scss';

const SignIn = ({signIn, handleSubmit }) => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Row>
      <Col>
        <h2>Iniciar sesión</h2>
        <Form
          name="normal_SignIn"
          className="SignIn-form"
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
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Link to="/forgot-password">Forgot password</Link>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="SignIn-form-button">
              Log in
            </Button>
            Or <Link to="/sign-up">Register now!</Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

SignIn.propTypes = {
  signIn: func.isRequired,
  handleSubmit: func.isRequired,
};

const mapDispatchToProps = {
  signIn: signInNotifier,
};

const mapStateToProps = (state) => ({ });


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'SignInForm',
  })(SignIn)
);

