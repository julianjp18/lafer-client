import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Row, Col } from 'antd';

const Users = ({}) => {

  return (
    <Row>
      <Col>
        <p>Users</p>
      </Col>
    </Row>
  );
};

Users.propTypes = {};

const mapDispatchToProps = { };

const mapStateToProps = (state) => ({ });


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
