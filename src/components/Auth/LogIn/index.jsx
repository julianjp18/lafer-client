import { Button, Col, Form, Row } from 'antd';
import i18n from 'i18next';
import { func, string } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { EmailField } from '../../../helpers/input/ContactInputs';
import { CreatePasswordField } from '../../../helpers/input/inputCreator';
import { required } from '../../../helpers/input/validations';
import PublicLayout from '../../../helpers/layouts/PublicLayout';
import { showModalMovement } from '../../../redux/movements/modalMovements';
import { confirmEmailNotifier } from '../../../redux/sagas/devise/actions/confirmEmail';
import { logInNotifier } from '../../../redux/sagas/devise/actions/logIn';
import { recoverPasswordNotifier } from '../../../redux/sagas/devise/actions/recoverPassword';
import { restorePasswordNotifier } from '../../../redux/sagas/devise/actions/restorePassword';
import ForgotPassword from '../ForgotPassword';
import './logIn.scss';

const loginModal = { getContainer: '.login' };

export const LogIn = ({
  logIn,
  handleSubmit,
  openForgotPassword,
  search,
  confirmEmail,
  recoverPassword,
  restorePassword,
}) => {
  useEffect(() => {
    if (search.includes('confirmationToken')) {
      confirmEmail(search);
    }
  }, [search]);

  const openRecoverPassword = () =>
    openForgotPassword({ recoverPassword, restorePassword });

  return (
    <PublicLayout>
      <Row className="login" type="flex" justify="center">
        <Col xs={24}>
          <h2 className="text-center p-20">{i18n.t('auth.logIn')}</h2>
          <Form
            colon={false}
            onSubmit={handleSubmit(logIn)}
            className="auth-form"
          >
            <EmailField hasLabel={false} isRequired name="email" />
            <Field
              name="password"
              component={CreatePasswordField}
              placeholder={i18n.t('form.credentialsInfo.password')}
              validate={[required]}
            />
            <Row type="flex" justify="center" className="mb-25">
              <Col xs={24} md={20} lg={16}>
                <Button type="primary" block htmlType="submit">
                  {i18n.t('auth.logIn')}
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row className="help-links">
        <Button type="link text-left" block onClick={openRecoverPassword}>
          {i18n.t('auth.forgotPassword')}
        </Button>
      </Row>
    </PublicLayout>
  );
};

LogIn.propTypes = {
  openForgotPassword: func.isRequired,
  logIn: func.isRequired,
  confirmEmail: func.isRequired,
  recoverPassword: func.isRequired,
  restorePassword: func.isRequired,
  search: string.isRequired,
  handleSubmit: func.isRequired,
};

const mapDispatchToProps = {
  logIn: logInNotifier,
  confirmEmail: confirmEmailNotifier,
  recoverPassword: recoverPasswordNotifier,
  restorePassword: restorePasswordNotifier,
  openForgotPassword: (modalProps) =>
    showModalMovement(ForgotPassword, modalProps, loginModal),
};

const mapStateToProps = (state) => ({
  search: state.router.location.search,
});

export const SimpleLogIn = LogIn;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'logInForm',
  })(LogIn)
);
