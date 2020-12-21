import { Layout, Menu } from 'antd';
import { push } from 'connected-react-router';
import { bool, func, shape, string } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Settings from '../../../../components/Settings';
import logOutMovement from '../../../../redux/movements/authMovements';
import {
  hideSiderMovement,
  toggleSiderMovement,
} from '../../../../redux/movements/layoutMovements';
import { showModalMovement } from '../../../../redux/movements/modalMovements';
import { authSelector } from '../../../../redux/reducers/auth/authSelectors';
import './layout.scss';
import './Sider.scss';
import { t } from '../../../../utils/helpers';
import menuCreator from './menuCreator';
import rolePaths from './rolePaths';

const PrivateSider = ({
  auth: { role },
  pathname,
  goTo,
  logOut,
  openSettings,
  hideSider,
  collapsed,
  visible,
}) => {
  const toggle = () => {
    if (window.innerWidth < 992) {
      hideSider();
    }
  };
  const renderMenu = () =>
    role ? menuCreator(rolePaths[role], goTo, toggle) : [];

  const selected = `/${pathname.split('/')[1]}`;
  return (
    visible && (
      <Layout.Sider
        className={`${!collapsed ? 'open' : ''}`}
        breakpoint="lg"
        collapsedWidth="113"
        trigger={null}
        collapsed={collapsed && visible}
        width={visible ? '266' : '0'}
      >
        {/* Menu Header */}
        <div className="menu-header">
          <h2>{t('menu.menu')}</h2>
        </div>

        {/* Menu Items */}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/']}
          selectedKeys={[selected]}
        >
          {renderMenu()}
          <Menu.Item key="settings" className="config" onClick={openSettings}>
            <span className="menu-title">
              <div className="menu-text">{t('menu.config')}</div>
            </span>
          </Menu.Item>
          <Menu.Item key="logout" className="logout" onClick={logOut}>
            <span className="menu-title">
              <div className="menu-text">{t('menu.exit')}</div>
            </span>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
    )
  );
};

PrivateSider.propTypes = {
  auth: shape({
    role: string,
  }).isRequired,
  pathname: string.isRequired,
  goTo: func.isRequired,
  logOut: func.isRequired,
  toggleSider: func.isRequired,
  hideSider: func.isRequired,
  openSettings: func.isRequired,
  collapsed: bool.isRequired,
  visible: bool.isRequired,
};

const mapStateToProps = (state) => ({
  auth: authSelector(state),
  pathname: state.router.location.pathname,
  collapsed: state.layout.sider.collapsed,
  visible: state.layout.sider.visible,
});

const mapDispatchToProps = {
  toggleSider: toggleSiderMovement,
  hideSider: hideSiderMovement,
  goTo: push,
  logOut: logOutMovement,
  openSettings: () => showModalMovement(Settings),
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateSider);
