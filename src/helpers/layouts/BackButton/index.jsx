import { Button } from 'antd';
import { func, string } from 'prop-types';
import React from 'react';
import './backButton.scss';

const BackButton = ({ title, action }) => {
  return (
    <div className="back-button-container">
      <Button type="link" onClick={action}>
        <i className="icon-arrow-left" />
        {title}
      </Button>
    </div>
  );
};

BackButton.propTypes = {
  action: func.isRequired,
  title: string.isRequired,
};

export default BackButton;
