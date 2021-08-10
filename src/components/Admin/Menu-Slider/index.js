import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";

import "./Menu-Slider.scss";

export const MenuSlider = ({ menuCollapsed }) => {
  const { Sider } = Layout;

  return (
    <Sider className="admin-slider" collapsed={menuCollapsed}>
      <Menu theme="dark" mode="inline" defaultOpenKeys={["1"]}>
        <Menu.Item key="1">
          <Link to={"/admin"}>
            <Icon type="home" />
            <span className="nav-text">Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={"/admin/menu-web"}>
            <Icon type="menu" />
            <span className="nav-text">Menu Web</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
