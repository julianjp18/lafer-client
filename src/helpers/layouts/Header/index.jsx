import React from 'react';
import { Layout, Menu } from 'antd';
import './header.scss';

const Header = () => (
  <Layout.Header className="header">
    <div className="logo-header" />
    <Menu className="horizontal-menu" mode="horizontal" defaultSelectedKeys={['1']}>
      <Menu.Item key="1">SOAT</Menu.Item>
      <Menu.Item key="2">Renta</Menu.Item>
      <Menu.Item key="3">Tecnología</Menu.Item>
    </Menu>
  </Layout.Header>
);

export default Header;