import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar";
import PropTypes from "prop-types";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import InputField from "../../common/input/input";
import RadioField from "../../common/radio/radio";
import SearchBar from "../../common/searchbar/searchbar";
import Button from "../../common/button/button";
import authProvider from "../../common/utils";
import { sortbyData, hallType } from "../../constants";
import * as action from "./data/book-hall-action";
import "./book-hall.scss";

function BookHallScreen() {
  const dispatch = useDispatch();
  const [showToggle, setShowToogle] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showModalItem, setShowModalItem] = useState({});
  const [userDetails] = useState(authProvider());
  let data = useSelector((state) => state.bookHallReducer.data);
  const [hallData, setHallData] = useState(data && data);
  const [disabledDates, setDisabledDates] = useState([]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    reset,
  } = useForm();
  const handleToggleFilter = () =>
    setShowToogle((previousSate) => !previousSate);
  const showBookCalendar = () => {
    setShowCalendar((previousSate) => !previousSate);
  };
  const [value, setValue] = useState(new Date());
  const history = useHistory();

  const onChange = (nextValue) => {
    setValue(nextValue);
  };

  const HallList = ({ item }) => {
    return (
      <>
        <tr>
          <td style={{ textTransform: "capitalize" }}>{item.hallName}</td>
          <td style={{ textTransform: "capitalize" }}>{item.hallCategory}</td>
          <td style={{ textTransform: "uppercase" }}>{item.halltype}</td>
          <td>{item.capacity}</td>
          <td>&#x20B9;{item.hallPrice}</td>
          <td>
            <Button
              text="BOOK NOW"
              className="book-hall-btn"
              onClick={() => getBookedDateData(item)}
            />
          </td>
        </tr>
      </>
    );
  };

  const searchHallName = (value) => {
    if (value !== "") {
      const searchTerm = value.toLowerCase();
      var myData = data.filter((value) => {
        return value.hallName.toLowerCase().match(new RegExp(searchTerm, "g"));
      });
      setHallData(myData);
    } else {
      setHallData(data);
    }
  };

  const showFilteredData = (data) => {
    const params = {
      hallCategory: data.eventType,
      sortby: data.sortby,
      hallType: data.hallType,
      capacity: data.capacity,
    };
    dispatch(action.getHallListFilteredData(params));
  };

  const clearSelectedFilter = () => {
    reset({
      hallCategory: "",
      sortby: "",
      hallType: "",
      capacity: "",
    });
    dispatch(action.getHallListData());
  };

  const successCallback = () => {
    toast.success("Hall booked successfully", { autoClose: 2000 });
    history.push("/booking-status");
  };

  const confirmHallBook = () => {
    const params = {
      userID: userDetails._id,
      userName: userDetails.firstName,
      hallID: showModalItem._id,
      hallStatus: "Selected",
      bookDate: value,
    };
    dispatch(action.saveHallBooking(params, successCallback));
  };

  const getBookedDateData = (item) => {
    const params = {
      _id: item._id,
    };
    setShowModalItem(item);
    dispatch(action.getBookedDates(params, calendarCallback));
  };

  // Check if a date React-Calendar wants to check is on the list of disabled dates
  const calendarCallback = (response) => {
    const dates = response
      .filter((filter) => {
        if (filter.bookings.hallStatus === "Booked") return filter;
      })
      .map((item) => {
        return item.bookings.bookDate;
      });
    setDisabledDates(dates);
    setShowCalendar((previousSate) => !previousSate);
  };

  function tileDisabled({ date, view }) {
    if (view === "month") {
      return disabledDates.find((dDate) => moment(dDate).isSame(date));
    }
  }

  useEffect(() => {
    dispatch(action.getHallListData());
  }, [reset]);

  useEffect(() => {
    data && setHallData(data);
  }, [data]);

  return (
    <>
      <div className="search-box">
        <SearchBar searchHallName={searchHallName} />
        <Button
          text="ADVANCE FILTER"
          className="filter-button"
          onClick={handleToggleFilter}
        />
      </div>
      {showToggle ? (
        <div className="advance-filter-container">
          <div className="advance-filter-row">
            <div className="col-20 col-span">
              <h3>Hall Category *</h3>
              <select
                id="hallCategory"
                label="eventType"
                className="input-area"
                {...register("eventType")}
              >
                <option value="">Any</option>
                <option value="birthday">Birthday</option>
                <option value="conference">Conference</option>
                <option value="marriage">Marriage</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div className="radio-container col-30 col-span">
              <RadioField
                label="sortby"
                text="Sort by"
                register={register}
                control={control}
                data={sortbyData}
                errors={errors}
                rules={{ required: false }}
              />
            </div>
            <div className="col-20 col-span">
              <InputField
                label="capacity"
                placeholder=""
                register={register}
                name="Capacity"
                errors={errors}
                type="number"
                rules={{ required: false }}
              />
            </div>
            <div className="radio-container col-20 col-span">
              <RadioField
                label="hallType"
                text="Hall Type"
                register={register}
                data={hallType}
                errors={errors}
                rules={{ required: false }}
              />
            </div>
          </div>
          <div className="form-submit-btn">
            <Button
              text="RESET"
              className="btn-clear-filter"
              onClick={clearSelectedFilter}
            />
            <Button
              text="SUBMIT"
              className="book-hall"
              onClick={handleSubmit(showFilteredData)}
            />
          </div>
        </div>
      ) : null}

      <table className="book-hall-table">
        <thead className="book-hall-thead">
          <tr>
            <th>Hall Name</th>
            <th>Category</th>
            <th>Type</th>
            <th>Capacity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="book-hall-tbody">
          {hallData && hallData.length > 0 ? (
            hallData.map((item) => {
              return <HallList key={item._id} item={item} />;
            })
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showCalendar ? (
        <>
          <div className="book-modal-window">
            <div className="book-modal-content">
              <div className="form-header">
                <h5>{showModalItem.hallName}</h5>
              </div>
              <Calendar
                onChange={onChange}
                value={value}
                minDate={moment().toDate()}
                tileDisabled={tileDisabled}
              />
              <div className="book-hall-footer">
                <Button
                  text="Cancel"
                  className="book-now-close"
                  onClick={showBookCalendar}
                />
                <Button
                  text="Confirm Booking"
                  className="book-now-confirm"
                  onClick={confirmHallBook}
                />
              </div>
            </div>
          </div>
          <div className="overlay-bg" />
        </>
      ) : null}
    </>
  );
}

BookHallScreen.propTypes = {
  item: PropTypes.object,
};

export default BookHallScreen;
