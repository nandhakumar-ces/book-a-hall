import React from "react";
import { Redirect, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCalendarCheck,
  faHistory,
  faInfoCircle,
  faUserAlt,
  faSignOutAlt,
  faBookReader,
} from "@fortawesome/free-solid-svg-icons";
import "./navbar.scss";

function NavMenuScreen() {
  const isLogin = sessionStorage.getItem("isLoggedIn");
  const userType = sessionStorage.getItem("userType");
  if (isLogin === null) {
    return <Redirect to="/login" />;
  } else {
    return (
      <>
        <div className="wrapper">
          <div className="sidebar-wrapper">
            <div className="sidebar-header">
              <FontAwesomeIcon icon={faBookReader} size={"2x"} color="#fff" />
            </div>
            <ul className="sidebar-nav">
              <li>
                <NavLink to="/dashboard" activeClassName="selected">
                  <FontAwesomeIcon icon={faHome} color="#fff" />
                  Dashboard
                </NavLink>
              </li>
              {userType === "user" ? (
                <>
                  <li>
                    <NavLink to="/book-a-hall" activeClassName="selected">
                      <FontAwesomeIcon icon={faCalendarCheck} color="#fff" />
                      Book a hall
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/booking-status" activeClassName="selected">
                      <FontAwesomeIcon icon={faInfoCircle} color="#fff" />
                      Booking Status
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/register-a-hall" activeClassName="selected">
                      <FontAwesomeIcon icon={faCalendarCheck} color="#fff" />
                      Register a hall
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/booking-status" activeClassName="selected">
                      <FontAwesomeIcon icon={faInfoCircle} color="#fff" />
                      Booking Requests
                    </NavLink>
                  </li>
                </>
              )}
              <li>
                <NavLink to="/booking-history" activeClassName="selected">
                  <FontAwesomeIcon icon={faHistory} color="#fff" />
                  Booking History
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile" activeClassName="selected">
                  <FontAwesomeIcon icon={faUserAlt} color="#fff" />
                  Profile
                </NavLink>
              </li>
              <li>
                <div className="sidebar-item-divider"> </div>
                <NavLink
                  to="/"
                  onClick={() => {
                    sessionStorage.clear();
                    <Redirect to="/login" />;
                  }}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} color="#fff" />
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default NavMenuScreen;
