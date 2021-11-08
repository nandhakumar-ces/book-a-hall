import React, { useState } from "react";
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
  faUsers,
  faHotel,
} from "@fortawesome/free-solid-svg-icons";
import * as action from "../login/data/login-action";
import { useDispatch } from "react-redux";
import authProvider from "../../common/utils";
import PropTypes from "prop-types";
import "./navbar.scss";

function NavMenuScreen({ isLoggedIn }) {
  const dispatch = useDispatch();

  const [userDetails] = useState(authProvider());
  if (isLoggedIn)
    return (
      <>
        <div className="wrapper">
          <div className="sidebar-wrapper">
            <div className="sidebar-header">
              <FontAwesomeIcon icon={faBookReader} size={"2x"} color="#fff" />
            </div>
            <ul className="sidebar-nav">
              {userDetails.userType === "admin" ? (
                <>
                  <li>
                    <NavLink to="/all-user" activeClassName="selected">
                      <FontAwesomeIcon icon={faUsers} color="#fff" />
                      All Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/all-hall" activeClassName="selected">
                      <FontAwesomeIcon icon={faHotel} color="#fff" />
                      All Halls
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/dashboard" activeClassName="selected">
                      <FontAwesomeIcon icon={faHome} color="#fff" />
                      Dashboard
                    </NavLink>
                  </li>
                  {userDetails.userType === "user" ? (
                    <>
                      <li>
                        <NavLink to="/book-a-hall" activeClassName="selected">
                          <FontAwesomeIcon
                            icon={faCalendarCheck}
                            color="#fff"
                          />
                          Book a hall
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/booking-status"
                          activeClassName="selected"
                        >
                          <FontAwesomeIcon icon={faInfoCircle} color="#fff" />
                          Booking Status
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <NavLink
                          to="/register-a-hall"
                          activeClassName="selected"
                        >
                          <FontAwesomeIcon
                            icon={faCalendarCheck}
                            color="#fff"
                          />
                          Register a hall
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/booking-status"
                          activeClassName="selected"
                        >
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
                </>
              )}
              <li>
                <div className="sidebar-item-divider"> </div>
                <NavLink
                  to="/"
                  onClick={() => {
                    sessionStorage.clear();
                    dispatch(action.requestLogOut());
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
  else return null;
}

NavMenuScreen.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default NavMenuScreen;
