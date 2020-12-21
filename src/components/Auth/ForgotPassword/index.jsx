import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row, Typography, Steps } from 'antd';
import EmailForm from '../../../helpers/auth/EmailForm';
import PasswordForm from '../../../helpers/auth/PasswordForm';
import Header from '../../../helpers/layouts/Header';
import { t } from '../../../utils/helperFunctions';
import './forgotPassword.scss';

const { Step } = Steps;

const ForgotPassword = ({ recoverPassword, restorePassword }) => {
  const [current, setcurrent] = useState(0);

  const next = () => {
    const currentTemp = 1;
    setcurrent(currentTemp);
  };

  const prev = () => {
    const currentTemp = 0;
    setcurrent(currentTemp);
  };

  const OnHandleSubmitEmail = (e) => {
    recoverPassword(e, next);
  };

  const items = [
    {
      title: t('form.credentialsInfo.email'),
      content: (
        <>
          <Typography>{t('auth.textSendEmailForgotPasswordForm')}</Typography>
          <EmailForm onSubmit={OnHandleSubmitEmail} />
        </>
      ),
    },
    {
      title: t('form.credentialsInfo.password'),
      content: (
        <>
          <Typography>
            {t('auth.textCodeReceivedForgotPasswordForm')}
          </Typography>
          <PasswordForm onSubmit={restorePassword} prevButton={prev} withOTP />
        </>
      ),
    },
  ];

  return (
    <Card title={<Header title={t('auth.forgotPassword')} />}>
      <Row type="flex" justify="center">
        <Col xs={20}>
          <Steps labelPlacement="vertical" initial={0} current={current}>
            {items.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{items[current].content}</div>
        </Col>
      </Row>
    </Card>
  );
};

ForgotPassword.propTypes = {
  recoverPassword: PropTypes.func.isRequired,
  restorePassword: PropTypes.func.isRequired,
};

export default ForgotPassword;
