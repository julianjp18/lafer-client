import { Button, Col, Form, Row } from 'antd';
import { bool, func } from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { t } from '../../../utils/helperFunctions';
import { passwordMatch, required, minLength6 } from '../../input/validations';
import './passwordForm.scss';
import { numOnly } from '../../input/format';
import { CreateOTPField, CreatePasswordField } from '../../input/inputCreator';

const PasswordForm = ({ onSubmit, handleSubmit, prevButton, withOTP }) => (
  <Form
    colon={false}
    onSubmit={handleSubmit(onSubmit)}
    className="password-form"
  >
    {withOTP && (
      <Row type="flex" gutter={32} justify="center">
        <Col xs={24} sm={20} md={12}>
          <Field
            name="restorePasswordToken"
            className="code"
            component={CreateOTPField}
            normalize={numOnly}
            validate={[required, minLength6]}
          />
        </Col>
      </Row>
    )}
    <Row type="flex" gutter={{ xs: 0, sm: 16 }} justify="center">
      <Col xs={20} sm={12}>
        <Field
          name="password"
          component={CreatePasswordField}
          placeholder={t('form.credentialsInfo.newPassword')}
          validate={[required]}
          hasFeedback
        />
      </Col>
      <Col xs={20} sm={12}>
        <Field
          name="passwordConfirmation"
          component={CreatePasswordField}
          placeholder={t('form.credentialsInfo.passwordConfirmation')}
          validate={[required, passwordMatch]}
          hasFeedback
        />
      </Col>
    </Row>
    <Row type="flex" justify="center" className="p-20" gutter={32}>
      <Col xs={12} lg={8}>
        <Button
          type="default go-back-btn"
          block
          onClick={prevButton}
          className="form-submit"
        >
          {t('form.credentialsInfo.resendEmail')}
        </Button>
      </Col>
      <Col xs={12} lg={12}>
        <Button block type="primary" htmlType="submit" className="form-submit">
          {t('form.credentialsInfo.changePassword')}
        </Button>
      </Col>
    </Row>
  </Form>
);

PasswordForm.propTypes = {
  onSubmit: func.isRequired,
  handleSubmit: func.isRequired,
  prevButton: func.isRequired,
  withOTP: bool,
};

PasswordForm.defaultProps = {
  withOTP: false,
};

export default reduxForm({
  form: 'passwordForm',
})(PasswordForm);
