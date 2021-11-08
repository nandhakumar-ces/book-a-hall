import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "./data/all-hall-action";
import NoData from "../../assets/svg/not-found.svg";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotel,
  faUser,
  faRupeeSign,
} from "@fortawesome/free-solid-svg-icons";

function AllHallScreen() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.allHallReducer.data);

  const AllUser = ({ item }) => {
    return (
      <li className="list-content-style">
        <div className="list-hall-name">{item.hallName}</div>
        <div className="list-hall-date">
          <FontAwesomeIcon
            icon={faUser}
            color={"#324e63"}
            style={{ marginRight: "5px" }}
          />
          {item.hallOwner.firstName}
        </div>
        <div className="list-user-name">
          <FontAwesomeIcon
            icon={faHotel}
            color={"#324e63"}
            style={{ marginRight: "5px" }}
          />
          {item.hallCategory}
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
    dispatch(action.getAllHallData());
  }, []);

  return (
    <div className="dashboard-hall-container">
      <div className="dashboard-hall-content">
        <div className="dashboard-hall-header">All Halls</div>
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

AllHallScreen.propTypes = {
  item: PropTypes.object,
};

export default AllHallScreen;
