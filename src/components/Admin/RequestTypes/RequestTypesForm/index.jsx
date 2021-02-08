import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Row, Col } from 'antd';
import './addForm.scss';

function RequestTypesForm({
  createForm,
  updateForm,
  deleteForm,
  requestTypesByIdForm,
  createRequestTypes,
  updateRequestTypes,
  deleteRequestTypes,
  getRequestTypesById,
}) {
  const history = useHistory();

  const onFinish = (values) => {

    if (createForm) createRequestTypes(values);
    else if (updateForm) updateRequestTypes(values);
    else if (deleteForm) deleteRequestTypes(values);
    else {
      getRequestTypesById(values);
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
              name="requestTypeID"
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
              ]}>
              <Input />
            </Form.Item>
          </Col>
        )}
        {!deleteForm && !requestTypesByIdForm && (
          <Col xs={8}>
            <Form.Item
              name="requestName"
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
            {requestTypesByIdForm && 'Buscar'}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default RequestTypesForm;
