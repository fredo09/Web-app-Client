import React from "react";
import { Layout, Tabs } from "antd";
import { Redirect } from "react-router-dom";
import { RegisterForm } from "./../../../components/Admin/RegisterForm";
import { SignInForm } from "./../../../components/Admin/SignInForm";
import { getVerifiedToken } from "./../../../api/Auth";
import Logo from "./../../../assets/img/logo-white.png";

import "./SignIn.scss";

export const SignIn = () => {
  const { Content } = Layout;
  const { TabPane } = Tabs;

  //vereficamos si tenemos el token de un usuario logeado
  if (getVerifiedToken()) return <Redirect to="/admin" />;

  return (
    <Layout className="sign-in">
      <Content className="sign-in__content">
        <h1 className="sign-in__content-logo">
          <img src={Logo} alt="Logo" />
        </h1>
        <div className="sign-in__content-tabs">
          <Tabs type="card">
            <TabPane tab={<span>Entrar</span>} key="1">
              {/* Login App */}
              <SignInForm />
            </TabPane>
            <TabPane tab={<span>Nuevo usuario</span>} key="2">
              {/* Nuevo Usuario */}
              <RegisterForm />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
};
