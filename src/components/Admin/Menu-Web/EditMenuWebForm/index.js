/**
 *  Componente Editar Menus
 **/

import React, { useState, useEffect } from "react";
import { Form, Button, Icon, Input, notification } from "antd";
import { updateMenuApi } from "./../../../../api/menus";
import { getVerifiedToken } from "./../../../../api/Auth";

import "./EditMenuWebForm.scss";

export const EditMenuWebForm = ({ setIsVisibleModal, setReloadMenu, menu }) => {
  const [menuData, setMenuData] = useState(menu);

  // Efecto que se actualiza con la nueva informacion del menu
  useEffect(() => {
    console.log("Menu se ha actualizado");
    console.log(menu);
    setMenuData(menu);
  }, [menu]);

  //Funcion que actualiza el menu con nuevos datos
  const editMenu = (e) => {
    e.preventDefault();

    if (!menuData.title || !menuData.url) {
      notification["error"]({
        message: "Los campos deben de ser obligatorios",
      });
    } else {
      const token_ = getVerifiedToken();

      updateMenuApi(token_, menuData._id, menuData).then((response) => {
        notification["success"]({
          message: response,
        });
        setIsVisibleModal(false);
        setReloadMenu(true);
        // setMenuData({});
      });
    }
  };

  return (
    <div className="edit-menu-web-form">
      <EditForm
        editMenu={editMenu}
        menuData={menuData}
        setMenuData={setMenuData}
      />
    </div>
  );
};

//Formulario de Edicion de Menus
const EditForm = ({ editMenu, menuData, setMenuData }) => {
  return (
    <Form className="form-edit" onSubmit={editMenu}>
      <Form.Item>
        <Input
          prefix={<Icon type="font-size" />}
          placeholder="Titulo"
          value={menuData.title}
          onChange={(e) => setMenuData({ ...menuData, title: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="link" />}
          placeholder="Url"
          value={menuData.url}
          onChange={(e) => setMenuData({ ...menuData, url: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Button className="btn-submit" htmlType="submit" type="primary">
          Actualizar Menu
        </Button>
      </Form.Item>
    </Form>
  );
};
