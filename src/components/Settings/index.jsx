import { Card } from 'antd';
import React from 'react';
import { connect } from 'react-redux';

const Settings = ({ }) => (
  <Card title={'settings'}>
    <p>settings</p>
  </Card>
);

Settings.propTypes = {};

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(Settings);
