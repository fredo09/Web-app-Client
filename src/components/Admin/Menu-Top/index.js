import React from "react";
import { Icon, Button } from "antd";
import { logaut } from "./../../../api/Auth";
import Logo from "./../../../assets/img/logo-white.png";

import "./Menu-Top.scss";

export const MenuTop = ({ setMenuCollapsed, menuCollapsed }) => {
  //Funcion de deslogueo del usuario
  const logoutUser = () => {
    logaut();
    window.location.reload();
  };

  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img className="menu-top__left-logo" src={Logo} alt="logo" />
        <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
          <Icon type={menuCollapsed ? "menu-unfold" : "menu-fold"} />
        </Button>
      </div>
      <div className="menu-top__right">
        <Button type="link" onClick={logoutUser}>
          <Icon type="poweroff" />
        </Button>
      </div>
    </div>
  );
};
