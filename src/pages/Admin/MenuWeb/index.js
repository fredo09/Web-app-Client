/**
 *   Menu Web para administrador
 **/

import React, { useEffect, useState } from "react";
import { MenuList } from "./../../../components/Admin/Menu-Web/MenuWebList";
import { getMenuApi } from "./../../../api/menus";

export const MenuWeb = () => {
  const [menus, setMenus] = useState([]);
  const [resloadMenu, setReloadMenu] = useState(false);

  useEffect(() => {
    getMenuApi().then((response) => {
      setMenus(response.menus);
    });
    setReloadMenu(false);
  }, [resloadMenu]);

  return (
    <div className="menu-web">
      <MenuList ListMenu={menus} setReloadMenu={setReloadMenu} />
    </div>
  );
};
