/**
 *   Componente Menu-Top para Web
 **/

import React, { useState, useEffect } from "react";
import LogoWeb from "./../../../assets/img/logo-white.png";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { getMenuApi } from "./../../../api/menus";

import "./Menu-Top.scss";

export const MenuTop = () => {
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    getMenuApi().then((response) => {
      let arrayActiveMenu = [];

      response.menus.forEach((item) => {
        item.active && arrayActiveMenu.push(item);
      });

      setMenuList(arrayActiveMenu);
      console.log(menuList);
    });
  }, []);

  return (
    <Menu className="menu-top-web" mode="horizontal">
      <Menu.Item className="menu-top__logo">
        <Link to={"/"}>
          <img src={LogoWeb} alt="Logo Web" />
        </Link>
      </Menu.Item>

      {menuList.map((menu) => {
        const external = menu.url.indexOf("http") > -1 ? true : false;

        if (external) {
          return (
            <Menu.Item key={menu._id} className="menu-top-web__item">
              <a href={menu.url} target="_blank" rel="noopener noreferrer">
                {menu.title}
              </a>
            </Menu.Item>
          );
        }

        return (
          <Menu.Item className="menu-top-web__item">
            <Link to={menu.url}>{menu.title}</Link>
          </Menu.Item>
        );
      })}

      <div>social media</div>
    </Menu>
  );
};
