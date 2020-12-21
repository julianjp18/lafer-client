import { Card } from 'antd';
import i18n from 'i18next';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import PasswordForm from '../../helpers/auth/PasswordForm';
import Title from '../../helpers/layouts/Title';
import { changePasswordNotifier } from '../../redux/sagas/users/actions/changePassword';

const Settings = ({ changePassword }) => (
  <Card title={<Title title={i18n.t('settings.title')} />}>
    <PasswordForm onSubmit={changePassword} />
  </Card>
);

Settings.propTypes = {
  changePassword: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  changePassword: changePasswordNotifier,
};

export default connect(null, mapDispatchToProps)(Settings);
