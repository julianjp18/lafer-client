import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { connect } from 'react-redux';
import {
  Form,
  Input,
  Tooltip,
  Checkbox,
  Button,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { signUp } from '../../redux/actions';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function SignUp({ signUp }) {
  const [user, updateUser] = useState("");
  const history = useHistory();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    updateUser(values.email);
    signUp(values);
    localStorage.setItem("user", user);
    history.push("/app");
  };

  return (
    <div style={{ padding: 50 }}>
      <h1>Registrarse</h1>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="Correo electrónico"
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
          name="password"
          label="Contraseña"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            () => ({
              validator(rule, value) {
                const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                if (reg.exec(value)) return Promise.resolve();;
                return Promise.reject('Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character');
              },
            }),

          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirmar contraseña"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="nickname"
          label={
            <span>
              Usuario&nbsp;
              <Tooltip title="Cómo quieres que te llamen?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            {
              required: true,
              message: 'Please input your nickname!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="fullName"
          label="Nombre completo"
          rules={[
            {
              required: true,
              message: 'Please input your fulllName!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Celular"
          rules={[
            {
              required: true,
              message: 'Please input your phone!',
            },
            () => ({
              validator(rule, value) {
                const reg = /[0-9]{10}$/;
                if (reg.exec(value)) return Promise.resolve();
                return Promise.reject('Por favor ingresar tu número celular. Ej:1234567890');
              },
            }),

          ]}
          hasFeedback>
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
          {...tailFormItemLayout}
        >
          <Checkbox>
            He leido los <Link to={'agreement'}>términos y condiciones</Link>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Registrarse
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

const mapDispatchToProps = {
  signUp: signUp,
};

export default connect(null, mapDispatchToProps)(SignUp);
