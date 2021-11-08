import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import * as action from "../book-request/data/book-request-action";
import PropTypes from "prop-types";
import NoData from "../../assets/svg/not-found.svg";
import authProvider from "../../common/utils";

dayjs.extend(localizedFormat);

function BookHistoryScreen() {
  const dispatch = useDispatch();
  const { data = {} } = useSelector(
    (state) => state.bookRequestReducer.bookRequest
  );
  const [bookHistoryData, setBookHistoryData] = useState([]);
  const [userDetails] = useState(authProvider());
  const today = new Date().toDateString();

  const Badge = ({ type }) => {
    switch (type) {
      case "Pending":
        return <span className="badge badge-orange">Pending</span>;
      case "Approved":
        return <span className="badge badge-primary">Approved</span>;
      case "Rejected":
        return <span className="badge badge-red">Rejected</span>;
      default:
        return null;
    }
  };

  const HallListUser = ({ item }) => {
    return (
      <li className="list-content-style">
        <div className="list-hall-name">{item.hallName}</div>
        <div className="list-hall-date">
          {dayjs(item.bookings.bookDate).format("ll")}
        </div>
        <div className="list-hall-status">
          <Badge type={item.bookings.approvalStatus} />
        </div>
      </li>
    );
  };

  const HallListOwner = ({ item }) => {
    return (
      <li className="list-content-style">
        <div className="list-hall-name">{item.hallName}</div>
        <div className="list-user-name">
          <FontAwesomeIcon
            icon={faUser}
            color={"#324e63"}
            style={{ marginRight: "5px" }}
          />
          {item.bookings.userName}
        </div>
        <div className="list-hall-date">
          {dayjs(item.bookings.bookDate).format("ll")}
        </div>
        <div className="list-hall-status">
          <Badge type={item.bookings.approvalStatus} />
        </div>
      </li>
    );
  };

  useEffect(() => {
    const params = {
      userID: userDetails._id,
      type: userDetails.userType,
    };
    dispatch(action.getBookRequestData(params));
  }, []);

  useEffect(() => {
    if (Object.keys(data).length) {
      const result = data.filter((filter) => {
        if (dayjs(filter.bookings.bookDate).isBefore(today)) return filter;
      });
      setBookHistoryData(result);
    }
  }, [data]);

  return (
    <div className="dashboard-hall-container">
      <div className="dashboard-hall-content">
        {userDetails.userType === "owner" ? (
          <>
            <div className="dashboard-hall-header">
              Booking History | All Users
            </div>
            {bookHistoryData.length ? (
              <div>
                <ul style={{ marginLeft: "-20px" }}>
                  {bookHistoryData.map((item) => {
                    return (
                      <HallListOwner key={item.bookings._id} item={item} />
                    );
                  })}
                </ul>
              </div>
            ) : (
              <figure className="no-data">
                <img src={NoData} height="100%" />
              </figure>
            )}
          </>
        ) : (
          <>
            <div className="dashboard-hall-header">My Booking History</div>
            {bookHistoryData.length ? (
              <div>
                <ul style={{ marginLeft: "-20px" }}>
                  {bookHistoryData.map((item) => {
                    return <HallListUser key={item.bookings._id} item={item} />;
                  })}
                </ul>
              </div>
            ) : (
              <figure className="no-data">
                <img src={NoData} height="100%" />
              </figure>
            )}
          </>
        )}
      </div>
    </div>
  );
}

BookHistoryScreen.propTypes = {
  item: PropTypes.object,
  type: PropTypes.string,
};

export default BookHistoryScreen;
