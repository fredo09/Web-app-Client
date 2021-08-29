import React, { useState } from "react";
import { Form, Icon, Input, Button, Checkbox, notification } from "antd";
import { minLengthValidation, validateEmail } from "./../../../utils";
import { signUpApi } from "./../../../api/User";

import "./RegisterForm.scss";

export const RegisterForm = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    privacyPolicy: false,
  });

  const [formValid, setformValid] = useState({
    email: false,
    password: false,
    repeatPassword: false,
    privacyPolicy: false,
  });

  //recuperando datos del formulario
  const changeForm = (e) => {
    if (e.target.name === "privacyPolicy") {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.checked,
      });
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
  };

  const validForm = (e) => {
    const { type, name } = e.target;

    if (type === "email") {
      setformValid({
        ...formValid,
        [name]: validateEmail(e.target),
      });
    }

    if (type === "password") {
      setformValid({
        ...formValid,
        [name]: minLengthValidation(e.target, 9),
      });
    }

    if (type === "checked") {
      setformValid({
        ...formValid,
        [name]: e.target.checked,
      });
    }
  };

  //enviando datos
  const registerForm = async (e) => {
    e.preventDefault();

    const emailValue = inputs.email;
    const passValue = inputs.password;
    const repeatPassValue = inputs.repeatPassword;
    const privacyPolicyValue = inputs.privacyPolicy;

    if (!emailValue || !passValue || !repeatPassValue || !privacyPolicyValue) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      if (passValue !== repeatPassValue) {
        notification["error"]({
          message: "Las contraseñas no coinciden",
        });
      } else {
        // TO DO: Conectar con la api y registrar el usuario
        const result = await signUpApi(inputs);

        if (result.status !== "OK") {
          notification["error"]({
            message: result.message,
          });
        } else {
          notification["success"]({
            message: result.message,
          });
          resetForm();
        }
      }
    }
  };

  //resetear formulario
  const resetForm = () => {
    const inputs = document.getElementsByTagName("inputs");

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove("success");
      inputs[i].classList.remove("error");
    }

    setInputs({
      email: "",
      password: "",
      repeatPassword: "",
      privacyPolicy: false,
    });

    setformValid({
      email: false,
      password: false,
      repeatPassword: false,
      privacyPolicy: false,
    });
  };

  return (
    <Form
      className="register-form"
      onChange={changeForm}
      onSubmit={registerForm}
    >
      <Form.Item>
        <Input
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="email"
          name="email"
          value={inputs.email}
          onChange={validForm}
          placeholder="Correo Electronico"
          className="register-form__input"
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          name="password"
          value={inputs.password}
          onChange={validForm}
          placeholder="Contraseña"
          className="register-form__input"
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          name="repeatPassword"
          value={inputs.repeatPassword}
          onChange={validForm}
          placeholder="Repite Contraseña"
          className="register-form__input"
        />
      </Form.Item>
      <Form.Item>
        <Checkbox name="privacyPolicy" checked={inputs.privacyPolicy}>
          Acepto politica de privacidad
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          className="register-form__button"
          onChange={validForm}
        >
          Crear cuenta
        </Button>
      </Form.Item>
    </Form>
  );
};
