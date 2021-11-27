/**
 * Componente Lista de Menus
 **/

import React, { useState, useEffect } from "react";
import { Modal } from "./../../../Modal";
import { MenuWebForm } from "./../AddMenuWebForm";
import { updateMenuApi, activateMenuApi } from "./../../../../api/menus";
import { getVerifiedToken } from "./../../../../api/Auth";
import DragSortableList from "react-drag-sortable";
import {
  Switch,
  List,
  Button,
  Icon,
  Modal as ModalAntd,
  notification,
} from "antd";

import "./MenuWebList.scss";

const { confirm } = ModalAntd;

export const MenuList = ({ ListMenu, setReloadMenu }) => {
  const [newVersionListMenu, setNewVersionListMenu] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  //Contiene el array de menus que usara el dropsortList
  useEffect(() => {
    const listItemsArray = [];

    ListMenu.forEach((item) => {
      listItemsArray.push({
        content: <MenuItem item={item} activateMenu={activateMenu} />,
      });
    });

    //agregamo el nuevo List compuesto del menus para su uso del drog
    setNewVersionListMenu(listItemsArray);
  }, [ListMenu]);

  //Actualizamos el status de activo o inactivo del menu
  const activateMenu = (idMenu, menuStatus) => {
    const token_ = getVerifiedToken();

    activateMenuApi(token_, idMenu, menuStatus).then((response) => {
      notification["success"]({
        message: response,
      });
    });
  };

  //Formulario para agregar nuevos menus
  const addMenuWebModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Crear Nuevo Menu");
    setModalContent(
      <MenuWebForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadMenu={setReloadMenu}
      />
    );
  };

  //actualiza el orden de la lista del menu
  const onSort = (sortedList, dropEvent) => {
    const token_ = getVerifiedToken();

    //actualizaremos el orden de las lista
    sortedList.forEach((item) => {
      const { _id } = item.content.props.item;
      const order = item.rank;
      updateMenuApi(token_, _id, { order });
    });
  };

  return (
    <div className="menu-web-list">
      <div className="menu-web-list__header">
        <div>
          <h2>Listado de Menus </h2>
        </div>
        <Button type="primary" onClick={addMenuWebModal}>
          Agregar Menu
        </Button>
      </div>

      <div className="menu-web-list__items">
        <DragSortableList
          items={newVersionListMenu}
          onSort={onSort}
          type="vertical"
        />
      </div>

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
};

//Item que contiene el contenido de los menus
const MenuItem = ({ item, activateMenu }) => {
  return (
    <List.Item
      actions={[
        <Switch
          defaultChecked={item.active}
          onChange={(e) => {
            activateMenu(item._id, e);
          }}
        />,
        <Button type="primary">
          <Icon type="edit" />
        </Button>,
        <Button type="danger">
          <Icon type="delete" />
        </Button>,
      ]}
    >
      <List.Item.Meta title={item.title} description={item.url} />
    </List.Item>
  );
};
