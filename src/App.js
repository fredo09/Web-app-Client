import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider";
import routes from "./routers";

import "./App.scss";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          {routes.map((route, idx) => (
            <RouterWithSubRouters key={idx} {...route} />
          ))}
        </Switch>
      </Router>
    </AuthProvider>
  );
}

function RouterWithSubRouters(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}

export default App;
