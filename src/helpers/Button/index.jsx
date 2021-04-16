import React from 'react';
import { Button } from 'antd';
import './button.scss';

const NormalButton = ({ text, isOrange = false, onClick }) => {
  return (
    <Button size="large" className={`button ${isOrange ? 'orange-btn' : ''}`} onClick={onClick}>{text}</Button>
  )
};

export default NormalButton;