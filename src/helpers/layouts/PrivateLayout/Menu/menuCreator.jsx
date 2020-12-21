import { Menu } from 'antd';
import React from 'react';
import { t } from '../../../../utils/helperFunctions';

export const MenuItem = (item, push, toggle) => (
  <Menu.Item
    key={item.path}
    style={item.style}
    onClick={() => {
      push(item.path);
      toggle();
    }}
  >
    <span className="menu-title">
      <i className={`icon-${item.icon}`} />
      <span className="menu-text">{` ${t(`menu.${item.title}`)}`}</span>
    </span>
  </Menu.Item>
);

export default (items, push, toggle) =>
  items.map((item) => {
    if (item.menus !== undefined) {
      return (
        <Menu.SubMenu key={item.title} style={item.style} title={item.title}>
          {item.menus.map((menu) => MenuItem(menu, null, push, toggle))}
        </Menu.SubMenu>
      );
    }
    return MenuItem(item, push, toggle);
  });
