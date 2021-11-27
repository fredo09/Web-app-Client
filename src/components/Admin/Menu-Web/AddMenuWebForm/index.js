/**
 *   Formulario para Agregar nuevo menus
 **/

import React, { useState } from "react";
import { Form, Button, Icon, Input, Select, notification } from "antd";
import { addMenuApi } from "./../../../../api/menus";
import { getVerifiedToken } from "./../../../../api/Auth";

import "./AddMenuWebForm.scss";

export const MenuWebForm = ({ setIsVisibleModal, setReloadMenu }) => {
  const [menuWebData, setMenuData] = useState({});

  //Creamos nuevos menus
  const addMenu = (e) => {
    e.preventDefault();

    let payaload = {
      title: menuWebData.title,
      url: (menuWebData.http ? menuWebData.http : "http://") + menuWebData.url,
    };

    if (!payaload.title || !payaload.url || !menuWebData.url) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      const token_ = getVerifiedToken();

      payaload.active = false;
      payaload.order = 1000;

      addMenuApi(token_, payaload)
        .then((response) => {
          notification["success"]({
            message: response,
          });

          //Reiniciamos el formulario, junto a propiedad que maneja la visibilidad del modal y el recargo de la pagina
          setIsVisibleModal(false);
          setReloadMenu(true);
          setMenuData({});
          payaload = {};
        })
        .catch(() => {
          notification["error"]({
            message: "Error en el servidor.",
          });
        });
    }
  };

  return (
    <div className="add-menu-web-form">
      <AddForm
        addMenu={addMenu}
        menuWebData={menuWebData}
        setMenuData={setMenuData}
      />
    </div>
  );
};

//Formulario de Agregar nuevo menu
const AddForm = ({ addMenu, menuWebData, setMenuData }) => {
  const { Option } = Select;

  //Formulario de Opciones
  const selectBefore = (
    <Select
      defaultValue="http://"
      style={{ width: 90 }}
      onChange={(e) => setMenuData({ ...menuWebData, http: e })}
    >
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );

  return (
    <Form className="form-add" onSubmit={addMenu}>
      <Form.Item>
        <Input
          prefix={<Icon type="font-size" />}
          placeholder="Titulo"
          value={menuWebData.title}
          onChange={(e) =>
            setMenuData({ ...menuWebData, title: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item>
        <Input
          addonBefore={selectBefore}
          placeholder="URL"
          value={menuWebData.url}
          onChange={(e) => setMenuData({ ...menuWebData, url: e.target.value })}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Agregar Menu
        </Button>
      </Form.Item>
    </Form>
  );
};
