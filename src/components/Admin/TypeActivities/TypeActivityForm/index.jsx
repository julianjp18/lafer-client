import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Row, Col } from 'antd';
import './addForm.scss';

function TypeActivityForm({
  createForm,
  updateForm,
  deleteForm,
  typeActivityByIdForm,
  createTypeActivity,
  updateTypeActivity,
  deleteTypeActivity,
  getTypeActivityById,
}) {
  const history = useHistory();

  const onFinish = (values) => {
    
    if (createForm) createTypeActivity(values);
    else if (updateForm) updateTypeActivity(values);
    else if (deleteForm) deleteTypeActivity(values);
    else getTypeActivityById(values);

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
              name="typeActivityID"
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
        {!deleteForm && !typeActivityByIdForm && (
          <Col xs={8}>
            <Form.Item
              name="activity"
              label="Nombre"
              placeholder="Ej: Polombia"
              rules={[
                {
                  required: true,
                  message: 'Por favor inserta nombre de la actividad!',
                  whitespace: true,
                },
              ]}
            >
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
            {typeActivityByIdForm && 'Buscar'}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default TypeActivityForm;
