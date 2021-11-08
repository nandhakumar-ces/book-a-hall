import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "./data/all-user-action";
import NoData from "../../assets/svg/not-found.svg";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneAlt,
  faEnvelope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function AllUserScreen() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.allUserReducer.data);

  const AllUser = ({ item }) => {
    return (
      <li className="list-content-style">
        <div className="list-hall-name">
          {item.firstName} {item.lastName}
        </div>
        <div className="list-user-name">
          <FontAwesomeIcon
            icon={faPhoneAlt}
            color={"#324e63"}
            style={{ marginRight: "5px" }}
          />
          {item.mobileNumber}
        </div>
        <div className="list-hall-date" style={{ textTransform: "lowercase" }}>
          <FontAwesomeIcon
            icon={faEnvelope}
            color={"#324e63"}
            style={{ marginRight: "5px" }}
          />
          {item.eMail}
        </div>
        <div className="list-hall-status">
          <FontAwesomeIcon
            icon={faUser}
            color={"#324e63"}
            style={{ marginRight: "5px" }}
          />
          {item.userType}
        </div>
      </li>
    );
  };

  useEffect(() => {
    dispatch(action.getAllUserData());
  }, []);

  return (
    <div className="dashboard-hall-container">
      <div className="dashboard-hall-content">
        <div className="dashboard-hall-header">All Users</div>
        {data && data.length ? (
          <>
            <div>
              <ul>
                {data.map((item) => {
                  return <AllUser key={item._id} item={item} />;
                })}
              </ul>
            </div>
          </>
        ) : (
          <figure className="no-data">
            <img src={NoData} height="100%" />
            <h1>No Data</h1>
          </figure>
        )}
      </div>
    </div>
  );
}

AllUserScreen.propTypes = {
  item: PropTypes.object,
};

export default AllUserScreen;
