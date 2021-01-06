import React, { useState } from "react";
import { Row, Col } from 'antd';
import ROUTES, { RenderRoutes } from "../routing/routes";
import 'antd/dist/antd.css';
import './app.scss';
import Menu from './Menu';

function App() {
  const [current, setcurrent] = useState('root');

  const handleClick = e => {
    setcurrent(e.key);
  };

  return (
    <Row>
      <Col xs={24}>
        <Menu />
        <div>
          <RenderRoutes routes={ROUTES} />
        </div>
      </Col>
    </Row>
  );
}

export default App;
