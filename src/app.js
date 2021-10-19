import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import LoginScreen from "./screens/login/login-screen";
import AppLayoutRoute from "./router/layout-router";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route path="/login" component={LoginScreen} />
        <Route component={AppLayoutRoute} />
      </Switch>
    </Router>
  );
}

export default App;
