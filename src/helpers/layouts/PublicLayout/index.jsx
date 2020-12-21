import { Col, Row } from 'antd';
import { arrayOf, element, oneOf, oneOfType, node } from 'prop-types';
import React from 'react';
import Header from '../Header';
import './publicLayout.scss';

const PublicLayout = ({ children, size }) => (
  <Row className="public-layout" type="flex" justify="center" align="middle">
    <Col
      xs={24}
      md={size === 'sm' ? 20 : 20}
      lg={size === 'sm' ? 14 : 18}
      xl={size === 'sm' ? 10 : 16}
      className="content-wrapper"
    >
      <Row>
        <Col xs={24} className="banner-header">
          <Header />
        </Col>
        <Col xs={24}>{children}</Col>
      </Row>
    </Col>
  </Row>
);

PublicLayout.propTypes = {
  children: oneOfType([arrayOf(element), node]).isRequired,
  size: oneOf(['sm', 'lg']),
};

PublicLayout.defaultProps = {
  size: 'sm',
};

export default PublicLayout;
