import React from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import './App.scss';
import Car from './resources/images/car.svg';
import Header from './helpers/layouts/Header';
import WeAre from './components/landing/WeAre';
import StepsQuotation from './components/landing/StepsQuotation';
import Footer from './helpers/layouts/Footer';

const App = () => {
  return (
    <Layout className="main-layout">
      <Header />
      <Layout className="main-header-menu">
        <Layout.Sider>
          <Menu className="vertical-header-menu" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">SOAT</Menu.Item>
          <Menu.Item key="2">Otro</Menu.Item>
          <Menu.Item key="3">Otro más</Menu.Item>
        </Menu>
        </Layout.Sider>
        <Layout.Content>
          <Row>
            <Col className="soat-car-container" xs={12}>
              <img className="image soat-car" src={Car} alt="SOAT CAR" />
            </Col>
            <Col className="soat-car-text-container" xs={12}>
              <Row>
                <Col className="soat-car-text-col" xs={24}>
                  <h1 className="soat-car-text">¡Adquiere aquí tu SOAT!</h1>
                </Col>
                <Col className="soat-car-text-col" xs={24}>
                  <p className="soat-car-url">Comprálo ya</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
      <Layout>
        <Layout.Content>
          <WeAre />
          <StepsQuotation />
        </Layout.Content>
      </Layout>
      <Footer />
      <div className="chat-popup-container">
        <p>Chat</p>
      </div>
    </Layout>
  );
}

export default App;
