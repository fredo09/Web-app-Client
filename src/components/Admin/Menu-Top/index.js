import React from "react";
import { Icon, Button } from "antd";
import Logo from "./../../../assets/img/logo-white.png";

import "./Menu-Top.scss";

export const MenuTop = () => {
  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img className="menu-top__left-logo" src={Logo} alt="logo" />
        <Button type="link" onClick={() => console.log("click menu")}>
          <Icon type="menu-fold" />
        </Button>
      </div>
      <div className="menu-top__right">
        <Button type="link">
          <Icon type="poweroff" />
        </Button>
      </div>
    </div>
  );
};
