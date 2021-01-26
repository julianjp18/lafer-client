import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Row, Col } from 'antd';
import './addForm.scss';

function PQRContactsForm({
  createForm,
  updateForm,
  deleteForm,
  PQRContactsByIdForm,
  createPQRContacts,
  updatePQRContacts,
  deletePQRContacts,
  getPQRContactsById,
}) {
  const history = useHistory();

  const onFinish = (values) => {

    if (createForm) createPQRContacts(values);
    else if (updateForm) updatePQRContacts(values);
    else if (deleteForm) deletePQRContacts(values);
    else {
      getPQRContactsById(values);
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
              name="pqrContactID"
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
        {!deleteForm && !PQRContactsByIdForm && (
          <Col xs={8}>
            <Form.Item
              name="identificaction"
              label="Identificación"
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
            <Form.Item
              name="fullName"
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
            <Form.Item
              name="email"
              label="Correo"
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
            <Form.Item
              name="movil"
              label="Celular"
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
            <Form.Item
              name="comment"
              label="Comentario"
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
            <Form.Item
              name="fileAnnex"
              label="Anexos"
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
            {PQRContactsByIdForm && 'Buscar'}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default PQRContactsForm;
