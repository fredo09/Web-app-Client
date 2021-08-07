import React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';

export const LayoutBasico = (props) => {
    const { routes } = props;

    const { Content, Footer } = Layout;

    return (
        <Layout>
            <h1>🚀  Layout Basico</h1>
            <Layout>
                <Content>
                    <LoadRender
                        routes={routes}
                    />
                </Content>
                <Footer>
                    ... Footer ...
                </Footer>
            </Layout>
        </Layout>
    );
}


function LoadRender({ routes }) {
    return routes.map((route, idx) => (
        <Route
            key={idx}
            component={route.component}
            exact={route.exact}
            path={route.path}
        />
    ));
}
