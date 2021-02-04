import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Row, Col } from 'antd';
import './addForm.scss';

function TypeCompaniesForm({
  createForm,
  updateForm,
  deleteForm,
  typeCompaniesByIdForm,
  createTypeCompanies,
  updateTypeCompanies,
  deleteTypeCompanies,
  getTypeCompaniesById,
}) {
  const history = useHistory();

  const onFinish = (values) => {
    
    if (createForm) createTypeCompanies(values);
    else if (updateForm) updateTypeCompanies(values);
    else if (deleteForm) deleteTypeCompanies(values);
    else {getTypeCompaniesById(values);
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
              name="typeCompanyID"
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
        {!deleteForm && !typeCompaniesByIdForm && (
          <Col xs={8}>
            <Form.Item
              name="company"
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
            {typeCompaniesByIdForm && 'Buscar'}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default TypeCompaniesForm;
