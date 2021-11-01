import React, { useState } from "react";
import { Route } from "react-router-dom";
import NavMenuScreen from "../screens/navbar/navbar-menu";
import DashboardScreen from "../screens/dashboard/dashboard";
import BookHallScreen from "../screens/book-hall/book-hall";
import RegisterHallScreen from "../screens/register-hall/register-hall";
import BookHistoryScreen from "../screens/book-history/book-history";
import BookRequestScreen from "../screens/book-request/book-request";
import ProfileScreen from "../screens/profile/profile";
import authProvider from "../common/utils";
import "./layout.scss";

function AppLayoutRoute() {
  const [userDetails] = useState(authProvider());
  return (
    <div className="nav-container">
      <NavMenuScreen />
      <div className="nav-main">
        <div className="nav-main-header">
          Hello, {userDetails.firstName} Welcome back!
        </div>
        <Route path="/dashboard" component={DashboardScreen} />
        <Route path="/book-a-hall" component={BookHallScreen} />
        <Route path="/register-a-hall" component={RegisterHallScreen} />
        <Route path="/booking-history" component={BookHistoryScreen} />
        <Route path="/booking-status" component={BookRequestScreen} />
        <Route path="/profile" component={ProfileScreen} />
      </div>
    </div>
  );
}

export default AppLayoutRoute;
