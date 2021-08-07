import React from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';

import './LayoutAdmin.scss';

export const LayoutAdmin = (props) => {

    const { routes } = props;

    const { Header, Content, Footer } = Layout;

    return (
        <Layout>
            <Header>
                ... Header ...
            </Header>
            <Content>
                <LoadRouters  routes={routes} />
            </Content>
            <Footer>
                ... Footer ...
            </Footer>
        </Layout>
    )
}

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
