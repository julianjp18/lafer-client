import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Row, Col } from 'antd';
import './bonusSoat.scss';
import BonusDiscount from "./BonusDiscount";
import BonusMilles from "./BonusMilles";

const BonusSoat = ({ mainInfo }) => {

  const onFinish = (values) => {
  };

  return (
    <div className="bonus-soat-container">
      <p className="subtitle-bonus-soat">Escoge el BONO de tu SOAT</p>
      <BonusDiscount />
      <BonusMilles />
    </div>
  );
}

export default BonusSoat;
