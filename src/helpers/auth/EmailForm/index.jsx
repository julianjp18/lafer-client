import { Button, Col, Form, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { email, required } from '../../input/validations';
import { t } from '../../../utils/helperFunctions';
import './emailForm.scss';
import { CreateTextField } from '../../input/inputCreator';

const EmailForm = ({ onSubmit, handleSubmit }) => (
  <Form colon={false} onSubmit={handleSubmit(onSubmit)} className="email-form">
    <Field
      name="email"
      component={CreateTextField}
      placeholder={t('form.credentialsInfo.email')}
      validate={[required, email]}
      hasFeedback
    />
    <Row type="flex" justify="center">
      <Col xs={20} md={14} lg={6}>
        <Button type="primary" block htmlType="submit">
          {t('layout.send')}
        </Button>
      </Col>
    </Row>
  </Form>
);

EmailForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'email-form',
})(EmailForm);
