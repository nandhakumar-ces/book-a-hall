import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import LoginScreen from "./screens/login/login-screen";
import AppLayoutRoute from "./router/layout-router";
import { authRoutes } from "../src/constants";

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Redirect to={authRoutes.login} />}
        />
        <Route path={authRoutes.login} component={LoginScreen} />
        <Route component={AppLayoutRoute} />
      </Switch>
    </Router>
  );
}

export default App;
