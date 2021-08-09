import React from "react";
import { MenuTop } from "./../../components/Admin/Menu-Top";
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";

import "./LayoutAdmin.scss";

export const LayoutAdmin = (props) => {
  const { routes } = props;

  const { Header, Content, Footer } = Layout;

  return (
    <Layout>
      {/**Menu slider */}
      <Layout className="layout-admin">
        <Header className="layout-admin__header">
          {/** Menu Top **/}
          <MenuTop />
        </Header>
        <Content className="layout-admin__content">
          <LoadRouters routes={routes} />
        </Content>
        <Footer className="layout-admin__footer">... Footer ...</Footer>
      </Layout>
    </Layout>
  );
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
