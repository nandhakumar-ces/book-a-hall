import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginScreen from "./components/login/login-screen";
import RegistrationForm from "./components/registration/registration-form";
import DashboardScreen from "./components/dashboard/dashboard-screen";
// import "./app.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegistrationForm} />
        <Route path="/dashboard" component={DashboardScreen} />
        <Route path="/" component={LoginScreen} />
      </Switch>
    </Router>
  );
}

export default App;
