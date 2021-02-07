import React, { useState } from "react";
import esEs from 'antd/es/locale/es_ES';
import { Row, Col } from 'antd';
import ROUTES, { RenderRoutes } from "../routing/routes";
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './app.scss';
import Menu from './Menu';
import ConfigProvider from "antd/es/config-provider";
import Footer from "./Footer";

function App() {
  const [current, setcurrent] = useState('root');

  const handleClick = e => {
    setcurrent(e.key);
  };

  return (
    <ConfigProvider locale={esEs}>
      <Row>
        <Col xs={24}>
          <Menu />
          <div className="routes-container">
            <RenderRoutes routes={ROUTES} />
          </div>
        </Col>
      <Col xs={24}>
          <Footer />
        </Col>
      </Row>
    </ConfigProvider>
  );
}

const mapStateToProps = (state) => ({ });

const mapDispatchToProps = { };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
