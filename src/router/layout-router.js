import React, { useState } from "react";
import { Route } from "react-router-dom";
import NavMenuScreen from "../screens/navbar/navbar-menu";
import DashboardScreen from "../screens/dashboard/dashboard";
import BookHallScreen from "../screens/book-hall/book-hall";
import RegisterHallScreen from "../screens/register-hall/register-hall";
import BookHistoryScreen from "../screens/book-history/book-history";
import BookRequestScreen from "../screens/book-request/book-request";
import ProfileScreen from "../screens/profile/profile";
import UnauthorizedScreen from "../screens/unauthorized/unauthorized";
import AllUserScreen from "../screens/all-user/all-user";
import AllHallScreen from "../screens/all-hall/all-hall";
import { userRoles, allUsers, authRoutes } from "../constants";
import authProvider from "../common/utils";
import AuthRoute from "./authn-router";
import "./layout.scss";

function AppLayoutRoute() {
  const [userDetails] = useState(authProvider());
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  return (
    <div className="nav-container">
      <NavMenuScreen isLoggedIn={isLoggedIn} />
      <div className="nav-main">
        {userDetails && (
          <div className="nav-main-header">
            Hello, {userDetails?.firstName} Welcome back!
          </div>
        )}
        <AuthRoute
          path={authRoutes.dashboard}
          Component={DashboardScreen}
          requiredRoles={[userRoles.user, userRoles.owner]}
        />
        <AuthRoute
          path={authRoutes.bookhall}
          Component={BookHallScreen}
          requiredRoles={[userRoles.user]}
        />
        <AuthRoute
          path={authRoutes.registerhall}
          Component={RegisterHallScreen}
          requiredRoles={[userRoles.owner]}
        />
        <AuthRoute
          path={authRoutes.bookhistory}
          Component={BookHistoryScreen}
          requiredRoles={[userRoles.user, userRoles.owner]}
        />
        <AuthRoute
          path={authRoutes.bookstatus}
          Component={BookRequestScreen}
          requiredRoles={[userRoles.user, userRoles.owner]}
        />
        <AuthRoute
          path={authRoutes.profile}
          Component={ProfileScreen}
          requiredRoles={allUsers.all}
        />
        <AuthRoute
          path={authRoutes.alluser}
          Component={AllUserScreen}
          requiredRoles={[userRoles.admin]}
        />
        <AuthRoute
          path={authRoutes.allhall}
          Component={AllHallScreen}
          requiredRoles={[userRoles.admin]}
        />
        <Route path={authRoutes.unauthorized} component={UnauthorizedScreen} />
      </div>
    </div>
  );
}

export default AppLayoutRoute;
