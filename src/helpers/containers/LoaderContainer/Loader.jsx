import PropTypes from 'prop-types';
import React from 'react';
import logo from '../../../resources/images/logo-horizontal.svg';

const Loader = ({ initial }) => (
  <div className={`loading-container ${initial && 'initial'}`}>
    {initial ? (
      <div className="image-loader">
        <img src={logo} alt="logo" />
        <div className="lds-grid">
          <div />
          <div />
          <div />
        </div>
      </div>
    ) : (
      <div className="lds-grid">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    )}
  </div>
);

Loader.propTypes = {
  initial: PropTypes.bool,
};

Loader.defaultProps = {
  initial: false,
};

export default Loader;
