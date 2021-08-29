import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";

import "./Menu-Slider.scss";

const MenuSlider = ({ menuCollapsed, location }) => {
  const { Sider } = Layout;

  return (
    <Sider className="admin-slider" collapsed={menuCollapsed}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
      >
        <Menu.Item key="/admin">
          <Link to={"/admin"}>
            <Icon type="home" />
            <span className="nav-text">Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/users">
          <Link to={"/admin/users"}>
            <Icon type="user" />
            <span className="nav-text">usuario</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default withRouter(MenuSlider);
