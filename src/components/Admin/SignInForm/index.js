import React, { useState } from "react";
import { Form, Icon, Button, Input, notification } from "antd";
import { signInApi } from "./../../../api/User";
import { minLengthValidation, validateEmail } from "./../../../utils";
import { setToken, setRefresToken } from "./../../../utils/token";

import "./SignInForm.scss";

export const SignInForm = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [formValid, setFormValid] = useState({
    email: false,
    password: false,
  });

  const changeForm = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const validForm = (e) => {
    const { type, name } = e.target;

    if (type === "email") {
      setFormValid({
        ...formValid,
        [name]: validateEmail(e.target),
      });
    }

    if (type === "password") {
      setFormValid({
        ...formValid,
        [name]: minLengthValidation(e.target, 9),
      });
    }
  };

  const login = async (e) => {
    e.preventDefault();

    const { email, password } = formValid;

    if (!email || !password) {
      notification["error"]({
        message: "debes de cumplir las validaciones",
      });
    } else {
      const result = await signInApi(loginForm);

      if (result) {
        if (result.status === "OK") {
          if (result.token) {
            //Asignamos token
            setToken(result.token);
            setRefresToken(result.refresToken);

            window.location.href = "/admin";
          }
        } else if (result.status === "ERROR") {
          console.log("error");
        }
      } else {
        notification["error"]({
          message: "Ocurrio un Error",
        });
      }
    }
  };

  return (
    <Form className="signIn-form" onChange={changeForm} onSubmit={login}>
      <Form.Item>
        <Input
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,0.25)" }} />}
          type="email"
          name="email"
          onChange={validForm}
          placeholder="Email"
          className="signIn-from__input"
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,0.25)" }} />}
          type="password"
          name="password"
          onChange={validForm}
          placeholder="Contraseña"
          className="signIn-from__input"
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="signIn-form__button">
          SignIn
        </Button>
      </Form.Item>
    </Form>
  );
};
