import React, { useState } from "react";
import { crearUsuarioApi } from "./../../../../api/User";
import { getVerifiedToken } from "./../../../../api/Auth";
import {
  Form,
  Icon,
  Input,
  Select,
  Button,
  Row,
  Col,
  notification,
} from "antd";

import "./AddUsers.scss";

export const AddUsers = ({ setIsVisibleModal, setReloadUsersPage }) => {
  const [userData, setUserData] = useState({});

  const addUsers = (e) => {
    e.preventDefault();

    if (
      !userData.name ||
      !userData.lastName ||
      !userData.email ||
      !userData.role ||
      !userData.password ||
      !userData.repeatPassword
    ) {
      notification["error"]({
        message: "Los campos no pueden estar vacios.",
      });
    } else if (userData.password !== userData.repeatPassword) {
      notification["error"]({
        message: "Las contraseñas no coinciden.",
      });
    } else {
      const token_ = getVerifiedToken();

      crearUsuarioApi(token_, userData)
        .then((response) => {
          notification["success"]({
            message: response.message,
          });

          setIsVisibleModal(false);
          setReloadUsersPage(true);
          setUserData({});
        })
        .catch((err) => {
          notification["error"]({
            message: err,
          });
        });
    }
  };

  return (
    <div className="add-user-form">
      <AddUsersForm
        userData={userData}
        setUserData={setUserData}
        addUsers={addUsers}
      />
    </div>
  );
};

const AddUsersForm = ({ userData, setUserData, addUsers }) => {
  const { Option } = Select;

  return (
    <Form className="form-add" onSubmit={addUsers}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              placeholder="Nombre"
              prefix={<Icon type="user" />}
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
              placeholder="Apellido"
              prefix={<Icon type="user" />}
              value={userData.lastName}
              onChange={(e) =>
                setUserData({ ...userData, lastName: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

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

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              placeholder="Contraseña"
              type="password"
              prefix={<Icon type="lock" />}
              value={userData.password}
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
              value={userData.repeatPassword}
              onChange={(e) =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Crear Usuario
        </Button>
      </Form.Item>
    </Form>
  );
};
