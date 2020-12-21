import { Col, Row } from 'antd';
import { bool, node, string } from 'prop-types';
import React from 'react';
import './title.scss';

const Title = ({ title, extra, small, icon, blueLine, type, className }) => (
  <Row
    className={`title-container ${className}
    ${small ? 'small' : ''}
    ${blueLine ? 'blue-line' : ''} ${type}`}
  >
    <Col xs={extra ? 12 : 24}>
      <div className="title-content">
        {icon && <i className={`title-icon icon-${icon}`} />}
        {small ? (
          <h2 className="title">{title}</h2>
        ) : (
          <h1 className="title">{title}</h1>
        )}
      </div>
    </Col>
    {extra ? (
      <Col xs={12} className="title-extra">
        {extra}
      </Col>
    ) : null}
  </Row>
);

Title.propTypes = {
  title: string.isRequired,
  icon: string,
  className: string,
  extra: node,
  small: bool,
  blueLine: bool,
  type: string,
};

Title.defaultProps = {
  extra: null,
  small: false,
  icon: null,
  blueLine: false,
  type: null,
  className: '',
};

export default Title;
