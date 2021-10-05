/**
 *   Componente para renderizar los usuarios activos y no activos
 **/

import React, { useState, useEffect } from "react";
import {
  Switch,
  List,
  Avatar,
  Button,
  Icon,
  notification,
  Modal as ModalDeleteUser,
} from "antd";
import { Modal } from "./../../../Modal";
import { EditUsers } from "./../EditUsers";
import { AddUsers } from "./../AddUsers";
import {
  getAvatarApi,
  activateUserApi,
  deleteUserApi,
} from "./../../../../api/User";
import { getVerifiedToken } from "./../../../../api/Auth";
import ImageNotFound from "./../../../../assets/img/no-avatar.png";

import "./ListUsers.scss";

// Modal de tipo confirmacion para eliminar usuarios
const { confirm } = ModalDeleteUser;

export const ListUsers = ({
  usersActive,
  usersNotActive,
  setReloadUsersPage,
}) => {
  const [viewUsersActives, setViewUsersActives] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  //Agregamos nuevo usuario
  const addUserModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Crear nuevo usuario");
    setModalContent(
      <AddUsers
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsersPage={setReloadUsersPage}
      />
    );
  };

  return (
    <div className="list-users">
      <div className="list-users__header">
        <div className="list-users__header-switch">
          <Switch
            defaultChecked
            onChange={() => setViewUsersActives(!viewUsersActives)}
          />
          <span>
            {viewUsersActives ? "Usuarios Activos" : "Usuarios no Activos"}
          </span>
        </div>

        <Button
          className="list-users__header"
          type="primary"
          onClick={addUserModal}
        >
          Nuevo Usuario
        </Button>
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
        <UserNotActives
          usersNotActive={usersNotActive}
          setReloadUsersPage={setReloadUsersPage}
        />
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
      renderItem={(user) => (
        <UserActive
          user={user}
          editUser={editUser}
          setReloadUsersPage={setReloadUsersPage}
        />
      )}
    />
  );
}

function UserActive({ user, editUser, setReloadUsersPage }) {
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

  //desactivamos usuario
  const desactiveUser = () => {
    const token_ = getVerifiedToken();

    activateUserApi(token_, user._id, false)
      .then((response) => {
        notification["success"]({
          message: response,
        });
        console.log("deshactivamos usuarios", true);
        setReloadUsersPage(true);
      })
      .catch((err) => {
        notification["error"]({
          message: err,
        });
      });
  };

  //Eliminamos usuario
  const deleteUser = () => {
    const token_ = getVerifiedToken();

    //Modal de confirmacion
    confirm({
      title: "Eliminar Usuario",
      content: `¿Estas seguro de elimiar el usuario ${user.email}`,
      okText: "Confirmar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteUserApi(token_, user._id)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            setReloadUsersPage(true);
          })
          .catch((err) => {
            notification["error"]({
              message: err,
            });
          });
      },
    });
  };

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => editUser(user)}>
          <Icon type="edit" />
        </Button>,
        <Button type="danger" onClick={desactiveUser}>
          <Icon type="stop" />
        </Button>,
        <Button type="danger" onClick={deleteUser}>
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

function UserNotActives({ usersNotActive, setReloadUsersPage }) {
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersNotActive}
      renderItem={(user) => (
        <UserNotActive user={user} setReloadUsersPage={setReloadUsersPage} />
      )}
    />
  );
}

function UserNotActive({ user, setReloadUsersPage }) {
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

  //desactivamos usuario
  const activeUser = () => {
    const token_ = getVerifiedToken();

    activateUserApi(token_, user._id, true)
      .then((response) => {
        notification["success"]({
          message: response,
        });
        setReloadUsersPage(true);
      })
      .catch((err) => {
        notification["error"]({
          message: err,
        });
      });
  };

  //Eliminamos usuario
  const deleteUser = () => {
    const token_ = getVerifiedToken();

    //Modal de confirmacion
    confirm({
      title: "Eliminar Usuario",
      content: `¿Estas seguro de elimiar el usuario ${user.email}`,
      okText: "Confirmar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteUserApi(token_, user._id)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            setReloadUsersPage(true);
          })
          .catch((err) => {
            notification["error"]({
              message: err,
            });
          });
      },
    });
  };
  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={activeUser}>
          <Icon type="check" />
        </Button>,
        <Button type="danger" onClick={deleteUser}>
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
