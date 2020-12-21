import React from 'react';
import { Row, Col, Tabs } from 'antd';
import Computer from '../../resources/images/computer.svg';
import Data from '../../resources/images/data.svg';

const { TabPane } = Tabs;

const Home = () => {
  return (
    <Row className="steps-container">
      <Col className="steps-col" xs={24}>
        <h2>¡TRES PASOS Y LISTO!</h2>
      </Col>
      <Col className="steps-col" xs={24}>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="COTIZA" key="1">
            <Row>
              <Col xs={12}>
                <img src={Computer} alt="computer person" />
              </Col>
              <Col xs={12}>
                <h2>Cotiza</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sequi cum recusandae quam aperiam similique debitis id cupiditate quia.
                </p>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="CONOCE" key="2">
            <Row>
              <Col xs={12}>
                <img src={Data} alt="computer person" />
              </Col>
              <Col xs={12}>
                <h2>Conoce</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sequi cum recusandae quam aperiam similique debitis id cupiditate quia.
                </p>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="PAGA" key="3">
            <Row>
              <Col xs={12}>
                <img src={Computer} alt="computer person" />
              </Col>
              <Col xs={12}>
                <h2>Paga</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sequi cum recusandae quam aperiam similique debitis id cupiditate quia.
                </p>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
}

export default Home;
