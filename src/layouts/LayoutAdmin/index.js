import React, { useState } from "react";
import { MenuTop } from "./../../components/Admin/Menu-Top";
import MenuSlider from "./../../components/Admin/Menu-Slider";
import { SignIn } from "./../../pages/Admin/SignIn";
import useAuth from "./../../hooks/useAuth";
import { Layout } from "antd";
import { Route, Switch, Redirect } from "react-router-dom";

import "./LayoutAdmin.scss";

export const LayoutAdmin = (props) => {
  const { routes } = props;

  const [menuCollapsed, setMenuCollapsed] = useState(false);

  const { Header, Content, Footer } = Layout;

  //Realizamos destructuri del contexto de usuario logeado
  const { user, isLoading } = useAuth();

  //si no hay usuario redirigimos al signIn
  if (!user && !isLoading) {
    return (
      <>
        <Route path="/admin/login" component={SignIn} />
        <Redirect to="/admin/login" />
      </>
    );
  }

  //si hay usuario logeado y termino de cargar
  if (user && !isLoading) {
    return (
      <Layout>
        {/**Menu slider */}
        <MenuSlider menuCollapsed={menuCollapsed} />
        <Layout
          className="layout-admin"
          style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}
        >
          <Header className="layout-admin__header">
            {/** Menu Top **/}
            <MenuTop
              setMenuCollapsed={setMenuCollapsed}
              menuCollapsed={menuCollapsed}
            />
          </Header>
          <Content className="layout-admin__content">
            <LoadRouters routes={routes} />
          </Content>
          <Footer className="layout-admin__footer">... Footer ...</Footer>
        </Layout>
      </Layout>
    );
  }

  // si no cumple regresamos null
  return null;
};

function LoadRouters({ routes }) {
  return (
    <Switch>
      {routes.map((route, idx) => (
        <Route
          key={idx}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}
