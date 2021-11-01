import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "./data/dashboard-action";
import authProvider from "../../common/utils";
import NoData from "../../assets/svg/not-found.svg";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotel,
  faSnowflake,
  faUsers,
  faRupeeSign,
} from "@fortawesome/free-solid-svg-icons";
import "./dashboard.scss";

function DashboardScreen() {
  const [userDetails] = useState(authProvider());
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dashboardReducer.data);

  const [pendingApproval, setPendingApproval] = useState(0);
  const [rejectedApproval, setRejectedApproval] = useState(0);
  const HallList = ({ item }) => {
    return (
      <li className="list-content-style">
        <div className="list-hall-name">{item.hallName}</div>
        <div className="list-user-name">
          <FontAwesomeIcon
            icon={faHotel}
            color={"#324e63"}
            style={{ marginRight: "5px" }}
          />
          {item.hallCategory}
        </div>
        <div className="list-hall-date" style={{ textTransform: "uppercase" }}>
          <FontAwesomeIcon
            icon={faSnowflake}
            color={"#324e63"}
            style={{ marginRight: "5px" }}
          />
          {item.halltype}
        </div>
        <div className="list-hall-date">
          <FontAwesomeIcon
            icon={faUsers}
            color={"#324e63"}
            style={{ marginRight: "5px" }}
          />
          {item.capacity}
        </div>
        <div className="list-hall-status">
          <FontAwesomeIcon
            icon={faRupeeSign}
            color={"#324e63"}
            style={{ marginRight: "5px" }}
          />
          {item.hallPrice}
        </div>
      </li>
    );
  };

  useEffect(() => {
    const user = userDetails.userType;
    if (user === "owner") {
      const params = {
        hallOwner: userDetails._id,
      };
      dispatch(action.getDashboardData(params));
    } else {
      const params = {
        userID: userDetails._id,
        type: user,
      };
      dispatch(action.getBookRequestData(params));
    }
  }, []);

  useEffect(() => {
    const usertype = userDetails.userType;
    if (usertype === "user")
      if (data) {
        const pending = data.filter((filter) => {
          if (filter.bookings.approvalStatus === "Pending") return filter;
        });
        const rejected = data.filter((filter) => {
          if (filter.bookings.approvalStatus === "Rejected") return filter;
        });
        setPendingApproval(pending.length);
        setRejectedApproval(rejected.length);
      }
  }, data);

  if (userDetails.userType === "owner")
    return (
      <div className="dashboard-hall-container">
        <div className="dashboard-hall-content">
          <div className="dashboard-hall-header">My Hall Details</div>
          {data && data.length > 0 ? (
            <>
              <div>
                <ul>
                  {data.map((item) => {
                    return <HallList key={item._id} item={item} />;
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
  else
    return (
      <div className="dashboard-hall-container">
        <div className="dashboard-hall-content">
          <div className="dashboard-hall-header">Booking Summary</div>
          {data ? (
            <>
              <div className="dash-row">
                <div className="c-dashboardInfo">
                  <div className="wrap">
                    <h6>Booked Halls</h6>
                    <span className="c-dashboardInfo-count">{data.length}</span>
                  </div>
                </div>
                <div className="c-dashboardInfo">
                  <div className="wrap">
                    <h6>Awaiting Approvals</h6>
                    <span className="c-dashboardInfo-count">
                      {pendingApproval}
                    </span>
                  </div>
                </div>

                <div className="c-dashboardInfo">
                  <div className="wrap">
                    <h6>Total Rejected</h6>
                    <span className="c-dashboardInfo-count">
                      {rejectedApproval}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <figure className="no-data">
              <img src={NoData} height="100%" />
            </figure>
          )}
        </div>
      </div>
    );
}

DashboardScreen.propTypes = {
  item: PropTypes.object,
};

export default DashboardScreen;
