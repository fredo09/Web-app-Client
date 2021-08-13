import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./routers";

import "./App.scss";

function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route, idx) => (
          <RouterWithSubRouters key={idx} {...route} />
        ))}
      </Switch>
    </Router>
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
