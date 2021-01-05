import React, { useState } from "react";
import { Menu, Row, Col } from 'antd';
import { Link } from "react-router-dom";
import { MenuOutlined } from '@ant-design/icons';
import ROUTES, { RenderRoutes } from "../routing/routes";
import 'antd/dist/antd.css';
import './app.scss';

function App() {
  const [current, setcurrent] = useState('root');

  const handleClick = e => {
    setcurrent(e.key);
  };

  return (
    <Row>
      <Col xs={24}>
        <Menu onClick={handleClick} selectedKeys={[current]} theme="dark" mode="horizontal" overflowedIcon={<MenuOutlined />}>
          {displayRouteMenu(ROUTES)}
        </Menu>
        <div>
          <RenderRoutes routes={ROUTES} />
        </div>
      </Col>
    </Row>
  );
}

export default App;

/**
 * Render a nested hierarchy of route configs with unknown depth/breadth
 */
function displayRouteMenu(routes) {
  /**
   * Render a single route as a list item link to the config's pathname
   */
  function singleRoute(route) {
    return (
      <Menu.Item key={route.path}>
        <Link to={route.path}>{route.key}</Link>
      </Menu.Item>
    );
  }

  // loop through the array of routes and generate an unordered list
  return (routes.map(route => {
        // if this route has sub-routes, then show the ROOT as a list item and recursively render a nested list of route links
        if (route.routes) {
          return (singleRoute(route));
        }

        // no nested routes, so just render a single route
        return singleRoute(route);
      })
  );
}
