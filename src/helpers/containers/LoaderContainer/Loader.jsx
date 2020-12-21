import PropTypes from 'prop-types';
import React from 'react';

const Loader = ({ initial }) => (
  <div className={`loading-container ${initial && 'initial'}`}>
    {initial ? (
      <div className="image-loader">
        <p>cargando...</p>
      </div>
    ) : (
        <div className="lds-grid">
          <p>cargando...</p>
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
