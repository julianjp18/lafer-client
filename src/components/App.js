import React, { useState, useEffect } from "react";
import esEs from 'antd/es/locale/es_ES';
import { Row, Col } from 'antd';
import ROUTES, { RenderRoutes } from "../routing/routes";
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './app.scss';
import Menu from './Menu';
import ConfigProvider from "antd/es/config-provider";
import Footer from "./Footer";
import FooterDesktop from './FooterDesktop';

const App = () => {
  const [isDesktop, setisDesktop] = useState(false);
  const mediaQuery = window.matchMedia('(min-width: 1000px)');

  const handleTabletChange = (e) => {
    // Check if the media query is true
    if (e.matches) {
      setisDesktop(true);
    }
  };
  
  useEffect(() => {
  }, []);

  setInterval(() => {
    mediaQuery.addListener(handleTabletChange);
    handleTabletChange(mediaQuery);
  }, 1000);
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
          {isDesktop ? <FooterDesktop /> : <Footer /> }
        </Col>
      </Row>
    </ConfigProvider>
  );
};

const mapStateToProps = (state) => ({ });

const mapDispatchToProps = { };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
