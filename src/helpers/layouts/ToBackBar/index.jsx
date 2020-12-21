import React from 'react';
import { Icon, Row } from 'antd';
import './ToBackBar.scss';
import { func } from 'prop-types';
import history from '../../../routing/history';
import { t } from '../../../utils/helperFunctions';

const ToBackBar = ({ action }) => (
  <div className="to-back-bar">
    <Row onClick={action || history.goBack}>
      <Icon type="arrow-left" />
      <span>{t('to-back')}</span>
    </Row>
  </div>
);

ToBackBar.propTypes = {
  action: func,
};

ToBackBar.defaultProps = {
  action: null,
};

export default ToBackBar;
