import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Row, Col } from 'antd';
import './addForm.scss';

function MainActivityForm({
  createForm,
  updateForm,
  deleteForm,
  mainActivityByIdForm,
  createMainActivity,
  updateMainActivity,
  deleteMainActivity,
  getMainActivityById,
}) {
  const history = useHistory();

  const onFinish = (values) => {
    
    if (createForm) createMainActivity(values);
    else if (updateForm) updateMainActivity(values);
    else if (deleteForm) deleteMainActivity(values);
    else getMainActivityById(values);

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
              name="mainActivityID"
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
        {!deleteForm && !mainActivityByIdForm && (
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
            {mainActivityByIdForm && 'Buscar'}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default MainActivityForm;
