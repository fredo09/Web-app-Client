/**
 *   Componente para renderizar los usuarios activos y no activos
 **/

import React, { useState, useEffect } from "react";
import { Switch, List, Avatar, Button, Icon } from "antd";
import { Modal } from "./../../../Modal";
import { EditUsers } from "./../EditUsers";
import { getAvatarApi } from "./../../../../api/User";
import ImageNotFound from "./../../../../assets/img/no-avatar.png";

import "./ListUsers.scss";

export const ListUsers = ({
  usersActive,
  usersNotActive,
  setReloadUsersPage,
}) => {
  const [viewUsersActives, setViewUsersActives] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  return (
    <div className="list-users">
      <div className="list-users__switch">
        <Switch
          defaultChecked
          onChange={() => setViewUsersActives(!viewUsersActives)}
        />
        <span>
          {viewUsersActives ? "Usuarios Activos" : "Usuarios no Activos"}
        </span>
      </div>
      {viewUsersActives ? (
        <UserActives
          usersActive={usersActive}
          setIsVisible={setIsVisibleModal}
          setModalTiitle={setModalTitle}
          setModalContent={setModalContent}
          setReloadUsersPage={setReloadUsersPage}
        />
      ) : (
        <UserNotActives usersNotActive={usersNotActive} />
      )}

      {/* Modal */}

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

function UserActives({
  usersActive,
  setIsVisible,
  setModalTiitle,
  setModalContent,
  setReloadUsersPage,
}) {
  //Editar Usuario
  const editUser = (user) => {
    setIsVisible(true);

    setModalTiitle(
      `Editar ${user.name ? user.name : "...."} ${
        user.lastName ? user.lastName : "..."
      }`
    );

    setModalContent(
      <EditUsers
        user={user}
        setIsVisible={setIsVisible}
        setReloadUsersPage={setReloadUsersPage}
      />
    );
  };

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => <UserActive user={user} editUser={editUser} />}
    />
  );
}

function UserActive({ user, editUser }) {
  const [avatar, setAvatar] = useState(null);

  //recuperamos la imagen de avatar del usuario en la lista de usuarios activos
  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => editUser(user)}>
          <Icon type="edit" />
        </Button>,
        <Button type="danger" onClick={() => console.log("desactivar user")}>
          <Icon type="stop" />
        </Button>,
        <Button type="danger" onClick={() => console.log("eliminar user")}>
          <Icon type="delete" />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : ImageNotFound} />}
        title={`
            ${user.name ? user.name : "..."} 
            ${user.lastName ? user.lastName : "..."}`}
        description={user.email}
      />
    </List.Item>
  );
}

function UserNotActives({ usersNotActive }) {
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersNotActive}
      renderItem={(user) => <UserNotActive user={user} />}
    />
  );
}

function UserNotActive({ user }) {
  const [avatar, setAvatar] = useState(null);

  //recuperamos la imagen de avatar del usuario en la lista de usuarios no activos
  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => console.log("activar user")}>
          <Icon type="check" />
        </Button>,
        <Button type="danger" onClick={() => console.log("eliminar user")}>
          <Icon type="delete" />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : ImageNotFound} />}
        title={`
            ${user.name ? user.name : "..."} 
            ${user.lastName ? user.lastName : "..."}`}
        description={user.email}
      />
    </List.Item>
  );
}
