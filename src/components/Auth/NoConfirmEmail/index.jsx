import { Card, Col, Row } from 'antd';
import i18n from 'i18next';
import PropTypes from 'prop-types';
import React from 'react';
import EmailForm from '../../../helpers/auth/EmailForm';
import Header from '../../../helpers/layouts/Header';


const NoConfirmEmail = ({ resendEmail }) => (
  <Card title={<Header title={i18n.t('auth.noConfirmEmail')} />}>
    <Row type="flex" justify="center">
      <Col xs={20}>
        <EmailForm onSubmit={resendEmail} />
      </Col>
    </Row>
  </Card>
);

NoConfirmEmail.propTypes = {
  resendEmail: PropTypes.func.isRequired,
};


export default NoConfirmEmail;
