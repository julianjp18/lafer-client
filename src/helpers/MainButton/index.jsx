import { Button } from "antd";
import React from "react";
import "./mainButton.scss";

const MainButton = ({
  text,
  isOrange = true,
  fromBonus = false,
}) => {
  return (
    <div className={`container main-btn-container ${isOrange ? 'container-naranja' : 'container-verde'} ${fromBonus ? 'from-bonus' : ''}`}>
      <Button className="cotizaSoatGratis" type="text" htmlType="submit">
        {text}
      </Button>
    </div>
  );
};

export default MainButton;