/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "./data/dashboard-action";
import "./dashboard.scss";
import NoData from "../../assets/svg/not-found.svg";

function DashboardScreen() {
  const dispatch = useDispatch();
  const [hallData, setHallData] = useState();
  const userType = sessionStorage.getItem("userType");
  const data = useSelector((state) => state.dashboardReducer.data);
  const HallList = ({ item }) => {
    console.log(item, "item");
    return (
      <li className="list-content-style">
        <div className="list-item-header">{item.hallName}</div>
        <div className="list-item-title">Type: {item.halltype}</div>
        <div className="list-item-footer">Capacity: {item.capacity}</div>
      </li>
    );
  };

  useEffect(() => {
    const ownerID = sessionStorage.getItem("userID");
    console.log(ownerID, "owner id");
    const params = {
      hallOwner: ownerID,
    };
    dispatch(action.getDashboardData(params));
  }, []);

  return (
    <div className="dashboard-hall-container">
      <div className="dashboard-hall-content">
        {data !== undefined && userType === "owner" ? (
          <>
            <div className="dashboard-hall-header">Hall Details</div>
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
}

export default DashboardScreen;
