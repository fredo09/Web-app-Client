import React, { useState, useCallback, useEffect } from "react";
import { Avatar, Button, Icon, Input, Select, Row, Col, Form } from "antd";
import { getAvatarApi } from "./../../../../api/User";
import { useDropzone } from "react-dropzone";
import NotAvatarImage from "./../../../../assets/img/no-avatar.png";

import "./EditUsers.scss";

export const EditUsers = ({ user }) => {
  const [avatar, setAvatar] = useState(null);

  const [userData, setUserData] = useState({});

  //actualizamos la informacion del usuario
  useEffect(() => {
    setUserData({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    });
  }, [user]);

  //recuperamos el avatar del usuario si es que tiene uno
  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  //Usamos el useEffect para actualizar el usuario
  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar: avatar.file });
    }
  }, [avatar]);

  const updateUser = (e) => {
    e.preventDefault();
    console.log(userData);
  };

  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm
        userData={userData}
        setUserData={setUserData}
        updateUser={updateUser}
      />
    </div>
  );
};

/**
 * Funcion para DropZone En react aqui podemos subir imagenes
 * @param {Object} props
 * @returns
 */
function UploadAvatar({ avatar, setAvatar }) {
  const [avatarUrl, setAvatarUrl] = useState(null);

  //Actualizamos el avatarUrl
  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);

  const onDropAvatar = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  //usamos Hook de react-dropZone para subir imagenes
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png, image/gif",
    noKeyboard: true,
    onDrop: onDropAvatar,
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />

      {isDragActive ? (
        <Avatar size={150} src={NotAvatarImage} />
      ) : (
        <Avatar size={150} src={avatarUrl ? avatarUrl : NotAvatarImage} />
      )}
    </div>
  );
}

function EditForm({ userData, setUserData, updateUser }) {
  const { Option } = Select;

  return (
    <Form className="form-edit" onSubmit={updateUser}>
      <Row gutter={24}>
        {/* Campos de nombre y Apellidos */}
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon type="user" />}
              placeholder="Nombre"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon type="user" />}
              placeholder="Apellidos"
              value={userData.lastName}
              onChange={(e) =>
                setUserData({ ...userData, lastName: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      {/* Campos de Email y Rol */}
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon type="mail" />}
              placeholder="Email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Seleccione el Rol"
              onChange={(e) => setUserData({ ...userData, role: e })}
              value={userData.role}
            >
              <Option value="admin">Administrador</Option>
              <Option value="editor">Editor</Option>
              <Option value="revisor">Revisor</Option>
              <Option value="user">Usuario</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      {/* Campos Password y Repetir Password */}
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              placeholder="Contraseña"
              type="password"
              prefix={<Icon type="lock" />}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              placeholder="Repetir Contraseña"
              type="password"
              prefix={<Icon type="lock" />}
              onChange={(e) =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualizar Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
