import React from "react";
import { Form, Input, Select } from 'antd';

import "./bonusForm.scss";

const { Option } = Select;

const BonusForm = () => {
  return (
    <div className='form'>
      <div className='textInput'>
        <p className='correoElectronico'>
          Correo electronico
        </p>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'El correo electrónico no es válido!',
            },
            {
              required: true,
              message: 'Por favor ingresa un correo electrónico!',
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>
      </div>
      <div className='textInput'>
        <p className='correoElectronico'>Celular</p>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: 'Por favor ingresa tu celular!',
            },
            () => ({
              validator(rule, value) {
                const reg = /3(0[1-2]|1[\d]|3[\d]|2[0-1])[\d]{3}[\d]{4}/;

                if (reg.exec(value) && value.length === 10) return Promise.resolve();
                return Promise.reject('Asegúrate de que el número ingresado comience con tres(3) y tenga 10 dígitos');
              },
            }),

          ]}
          hasFeedback
        >
          <Input size="large" style={{ width: '100%' }} />
        </Form.Item>
      </div>
      <div className='textInput'>
        <div className='flexWrapperOne'>
          <p className='tipo'>Tipo</p>
          <p className='tipo'>Documento</p>
        </div>
        <Form.Item>
          <Input.Group compact>
            <Form.Item
              name={['identification', 'type']}
              noStyle
              rules={[{ required: true, message: 'Seleccionar un tipo de documento es requerido' }]}
            >
              <Select size="large" style={{ width: '15%', marginRight: '1%' }} placeholder="Selecciona">
                <Option value="1">CC</Option>
                <Option value="2">TI</Option>
                <Option value="3">NIT</Option>
                <Option value="4">CE</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={['identification', 'number']}
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Documento es requerido',
                  whitespace: true,
                },
                () => ({
                  validator(rule, value) {
                    const reg = /[0-9]{6,10}$/;
                    if (reg.exec(value)) return Promise.resolve();;
                    return Promise.reject('Mínimo 6 números, máximo 10.');
                  },
                }),
              ]}
            >
              <Input size="large" style={{ width: '84%' }} placeholder="Ingresa tu número de documento" />
            </Form.Item>
          </Input.Group>
        </Form.Item>

      </div>
      <div className="textInput">
        <p className='correoElectronico'>Dirección</p>
        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: 'Por favor ingresa la dirección!',
              whitespace: true,
            },
          ]}
        >
          <Input size="large" placeholder="Ingresa tu dirección" />
        </Form.Item>
      </div>
    </div>
  );
};

export default BonusForm;