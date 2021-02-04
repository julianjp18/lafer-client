import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Row, Col } from 'antd';
import './addForm.scss';

function TypeIdentificationsForm({
  createForm,
  updateForm,
  deleteForm,
  typeIdentificationsByIdForm,
  createTypeIdentifications,
  updateTypeIdentifications,
  deleteTypeIdentifications,
  getTypeIdentificationsById,
}) {
  const history = useHistory();

  const onFinish = (values) => {
    
    if (createForm) createTypeIdentifications(values);
    else if (updateForm) updateTypeIdentifications(values);
    else if (deleteForm) deleteTypeIdentifications(values);
    else {getTypeIdentificationsById(values);
    }
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
        {!createForm && (
          <Col xs={8}>
            <Form.Item
              name="typeIdentificationID"
              other="id"
              label="id"
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
                  whitespace: false,
                },
                () => ({
                  validator(rule, value) {
                    const reg = /[0-9]{1,10}$/;
                    if (reg.exec(value)) return Promise.resolve();;
                    return Promise.reject('Mínimo 1 número, máximo 10.');
                  },
                }),
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        )}
        {!deleteForm && !typeIdentificationsByIdForm && (
          <Col xs={8}>
            <Form.Item
              name="identification"
              label="Nombre"
              placeholder="Ej: Polombia"
              rules={[
                {
                  required: true,
                  message: 'Por favor inserta la información!',
                  whitespace: true,
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
        )}
      </Row>
      <Row>
        <Col xs={24}>
          <Button type={updateForm ? 'default' : 'primary'} htmlType="submit" danger={deleteForm ? true : false}>
            {deleteForm && 'Eliminar'}
            {updateForm && 'Actualizar'}
            {createForm && 'Agregar'}
            {typeIdentificationsByIdForm && 'Buscar'}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default TypeIdentificationsForm;
