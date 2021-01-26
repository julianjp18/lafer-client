import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Row, Col } from 'antd';
import './addForm.scss';

function LinkClassesForm({
  createForm,
  updateForm,
  deleteForm,
  linkClassesByIdForm,
  createLinkClasses,
  updateLinkClasses,
  deleteLinkClasses,
  getLinkClassesById,
}) {
  const history = useHistory();

  const onFinish = (values) => {
    
    if (createForm) createLinkClasses(values);
    else if (updateForm) updateLinkClasses(values);
    else if (deleteForm) deleteLinkClasses(values);
    else {getLinkClassesById(values);
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
              name="linkClassID"
              other="linkClassID"
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
        {!deleteForm && !linkClassesByIdForm && (
          <Col xs={8}>
            <Form.Item
              name="nameLink"
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
              name="other"
              label="Nombre Adicional"
              placeholder="Ej: Polombia"
              rules={[
                {
                  required: true,
                  message: 'Por favor inserta la información!',
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
            {linkClassesByIdForm && 'Buscar'}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default LinkClassesForm;
