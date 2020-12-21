import PropTypes, { string } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { ADMIN_ROLE } from '../../utils/roles';
import { authSelector } from '../../redux/reducers/auth/authSelectors';
import Landing from './LandingRoot';
import AdminRoot from './AdminRoot';

const Root = ({ auth: { token, role } }) => {
  if (token) {
    //if ([ADMIN_ROLE].includes(role))
    //  return <AdminRoot />;

    return <AdminRoot />;
  }
  return <Landing />;
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
