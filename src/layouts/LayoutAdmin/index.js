import React, { useState } from "react";
import { MenuTop } from "./../../components/Admin/Menu-Top";
import { MenuSlider } from "./../../components/Admin/Menu-Slider";
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";

import "./LayoutAdmin.scss";

export const LayoutAdmin = (props) => {
  const { routes } = props;

  const [menuCollapsed, setMenuCollapsed] = useState(false);

  const { Header, Content, Footer } = Layout;

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
