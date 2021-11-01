import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faCheckCircle,
  faTimesCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import * as action from "./data/book-request-action";
import moment from "moment";
import PropTypes from "prop-types";
import NoData from "../../assets/svg/not-found.svg";
import authProvider from "../../common/utils";
import "./book-request.scss";

const BookRequestScreen = () => {
  const dispatch = useDispatch();
  const {
    loading = false,
    error = false,
    data = {},
  } = useSelector((state) => state.bookRequestReducer.bookRequest);
  const [userDetails] = useState(authProvider());
  const [toastMessage, setToastMessage] = useState("Sucess");
  const toastId = useRef(null);
  const today = new Date();

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

  const confirmDelete = (item) => {
    setToastMessage("Deleted Successfully");
    dispatch(
      action.deleteBookRequest({
        id: item.bookings._id,
      })
    );
  };

  const HallListUser = ({ item }) => {
    return (
      <li className="list-content-style">
        <div className="list-hall-name">{item.hallName}</div>
        <div className="list-hall-date">
          {moment(item.bookings.bookDate).format("ll")}
        </div>
        <div className="list-hall-status">
          <Badge type={item.bookings.approvalStatus} />
        </div>
        <div className="list-hall-approval">
          {item.bookings.approvalStatus === "Pending" ? (
            <a onClick={() => confirmDelete(item)}>
              <FontAwesomeIcon
                icon={faTrashAlt}
                color="red"
                style={{ fontSize: "22px" }}
              />
            </a>
          ) : null}
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
          {moment(item.bookings.bookDate).format("ll")}
        </div>
        <div className="list-hall-status">
          <Badge type={item.bookings.approvalStatus} />
        </div>
        <div className="list-hall-approval">
          {item.bookings.approvalStatus === "Pending" ? (
            <>
              <a
                onClick={() => {
                  setToastMessage("Request Approved");

                  dispatch(
                    action.updateBookRequest({
                      id: item.bookings._id,
                      type: "Approved",
                      hallStatus: "Booked",
                    })
                  );
                }}
              >
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  color="green"
                  size={"2x"}
                />
              </a>
              <a
                onClick={() => {
                  setToastMessage("Request Rejected");
                  dispatch(
                    action.updateBookRequest({
                      id: item.bookings._id,
                      type: "Rejected",
                      hallStatus: "Available",
                    })
                  );
                }}
              >
                <FontAwesomeIcon icon={faTimesCircle} color="red" size={"2x"} />
              </a>
            </>
          ) : null}
        </div>
      </li>
    );
  };

  const showLoader = () =>
    (toastId.current = toast("Loading, please wait...", {
      type: toast.TYPE.INFO,
      autoClose: false,
    }));

  const showError = () =>
    toast.update(toastId.current, {
      render: "Request failed, please try again",
      type: toast.TYPE.ERROR,
      autoClose: 2000,
    });

  const showSuccess = () =>
    toast.update(toastId.current, {
      render: toastMessage,
      type: toast.TYPE.SUCCESS,
      autoClose: 2000,
    });

  useEffect(() => {
    const params = {
      userID: userDetails._id,
      type: userDetails.userType,
    };
    dispatch(action.getBookRequestData(params));
  }, [loading]);

  useEffect(() => {
    if (loading) {
      showLoader();
    } else {
      if (error) {
        showError();
      } else {
        showSuccess();
      }
    }
  }, [loading]);

  return (
    <div className="dashboard-hall-container">
      <div className="dashboard-hall-content">
        {userDetails.userType === "owner" ? (
          <>
            <div className="dashboard-hall-header">
              Approve Requests | All Users
            </div>
            {data && data.length > 0 ? (
              <div>
                <ul style={{ marginLeft: "-20px" }}>
                  {data
                    .filter((filter) => {
                      if (moment(filter.bookings.bookDate).isSameOrAfter(today))
                        return filter;
                    })
                    .map((item) => {
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
            <div className="dashboard-hall-header">My Booking Status</div>
            {data && data.length > 0 ? (
              <div>
                <ul style={{ marginLeft: "-20px" }}>
                  {data
                    .filter((filter) => {
                      if (moment(filter.bookings.bookDate).isSameOrAfter(today))
                        return filter;
                    })
                    .map((item) => {
                      return (
                        <HallListUser key={item.bookings._id} item={item} />
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
        )}
      </div>
    </div>
  );
};

BookRequestScreen.propTypes = {
  item: PropTypes.object,
  type: PropTypes.string,
};

export default BookRequestScreen;
