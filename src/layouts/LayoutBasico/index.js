import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout, Row, Col } from "antd";

//Importacion del contenido del layoutBasico
import { MenuTop } from "./../../components/Web/Menu-Top";

export const LayoutBasico = (props) => {
  const { routes } = props;

  const { Content, Footer } = Layout;

  return (
    <>
      <Row>
        <Col lg={4} />
        <Col lg={16}>
          <MenuTop />
        </Col>
        <Col lg={4} />
      </Row>
      <LoadRender routes={routes} />
      <Footer>Footer</Footer>
    </>
  );

  // return (
  //     <Layout>
  //         <h1>🚀  Layout Basico</h1>
  //         <Layout>
  //             <Content>
  //                 <LoadRender
  //                     routes={routes}
  //                 />
  //             </Content>
  //             <Footer>
  //                 ... Footer ...
  //             </Footer>
  //         </Layout>
  //     </Layout>
  // );
};

function LoadRender({ routes }) {
  return (
    <Switch>
      {routes.map((route, idx) => (
        <Route
          key={idx}
          component={route.component}
          exact={route.exact}
          path={route.path}
        />
      ))}
    </Switch>
  );
}
