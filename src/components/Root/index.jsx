import PropTypes, { string } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { authSelector } from '../../redux/reducers/authReducer/authSelectors';
import { ADMIN_ROLE } from '../../utils/roles';
import Login from '../Auth/LogIn';
import AdminRoot from './AdminRoot';
import UserRoot from './UserRoot';

const Root = ({ auth: { token, role } }) => {
  if (token) {
    if ([ADMIN_ROLE].includes(role))
      return <AdminRoot />;

    return <UserRoot />;
  }
  return <Login />;
};

Root.propTypes = {
  auth: PropTypes.shape({
    token: string,
    role: string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  auth: authSelector(state),
});

export default connect(mapStateToProps, null)(Root);
