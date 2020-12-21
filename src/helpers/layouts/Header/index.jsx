import React from 'react';
import { Layout } from 'antd';
import logo from '../../../resources/images/logo-horizontal.svg';
import './header.scss';

const Header = () => (
  <Layout.Header className="header">
    <img src={logo} alt="logo" />
  </Layout.Header>
);

export default Header;
