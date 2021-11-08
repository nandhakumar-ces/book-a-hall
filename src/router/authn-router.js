import React from "react";
import { Route, Redirect } from "react-router-dom";
import { authRoutes } from "../constants";
import PropTypes from "prop-types";
import authProvider from "../common/utils";

function AuthRoute({ Component, path, exact = false, requiredRoles }) {
  const userDetails = authProvider();
  const isAuthed = sessionStorage.getItem("isLoggedIn");
  const canAccess = requiredRoles?.includes(userDetails?.userType);
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) =>
        isAuthed && canAccess ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: !isAuthed ? authRoutes.login : authRoutes.unauthorized,
              state: {
                requestedPath: path,
              },
            }}
          />
        )
      }
    />
  );
}

AuthRoute.propTypes = {
  Component: PropTypes.elementType,
  path: PropTypes.string,
  exact: PropTypes.bool,
  requiredRoles: PropTypes.array,
};

export default AuthRoute;
