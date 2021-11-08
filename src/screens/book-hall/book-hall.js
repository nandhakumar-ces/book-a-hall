import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as action from "./data/book-hall-action";
import PropTypes from "prop-types";
import InputField from "../../common/input/input";
import RadioField from "../../common/radio/radio";
import SelectField from "../../common/dropdown/dropdown";
import SearchBar from "../../common/searchbar/searchbar";
import Button from "../../common/button/button";
import "./book-hall.scss";

function BookHallScreen() {
  const dispatch = useDispatch();
  const [showToggle, setShowToogle] = useState(false);
  const data = useSelector((state) => state.bookHallReducer.data);
  const defaultValues = {
    Sortby: "lowtohigh",
  };
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
  } = useForm(defaultValues);
  const handleToggleFilter = () =>
    setShowToogle((previousSate) => !previousSate);

  const sortbyData = [
    {
      id: 1,
      name: "sorting",
      title: "Low to High",
      value: "lowtohigh",
      checked: true,
    },
    {
      id: 2,
      name: "sorting",
      title: "High to Low",
      value: "hightolow",
      checked: false,
    },
  ];

  const hallType = [
    {
      id: 3,
      name: "halltype",
      title: "AC",
      value: "ac",
      checked: true,
    },
    {
      id: 4,
      name: "halltype",
      title: "Non AC",
      value: "nonac",
      checked: false,
    },
  ];

  const eventType = [
    {
      id: 1,
      title: "Birthday",
      value: "birthday",
    },
    {
      id: 2,
      title: "Conference",
      value: "conference",
    },
    {
      id: 3,
      title: "Marriage",
      value: "marriage",
    },
    {
      id: 4,
      title: "Custom",
      value: "custom",
    },
  ];

  const HallList = ({ item }) => {
    console.log(item, "hall item");
    return (
      <>
        <tr>
          <td style={{ textTransform: "capitalize" }}>{item.hallName}</td>
          <td style={{ textTransform: "capitalize" }}>{item.hallCategory}</td>
          <td style={{ textTransform: "uppercase" }}>{item.halltype}</td>
          <td>{item.capacity}</td>
          <td>&#x20B9;{item.hallPrice}</td>
          <td>{item.status}</td>
          <td>
            <Button
              text="BOOK NOW"
              class="book-hall-btn"
              onClick={() => console.log("clicked")}
            />
          </td>
        </tr>
      </>
    );
  };

  const searchHallName = () => {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("hallTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  };

  const showFilteredData = (data) => {
    let sortby = "";
    let halltype = "";
    if (data.hallType !== null) halltype = data.hallType;
    if (data.sortby !== null) sortby = data.sortby;
    const params = {
      hallCategory: data.eventType,
      sortby: sortby,
      hallType: halltype,
      capacity: data.capacity,
    };
    dispatch(action.getHallListFilteredData(params));
  };

  useEffect(() => {
    dispatch(action.getHallListData());
  }, []);

  return (
    <>
      <div className="search-box">
        <SearchBar searchHallName={searchHallName} />
        <button className="filter-button" onClick={handleToggleFilter}>
          ADVANCE FILTER
        </button>
      </div>
      {showToggle === true ? (
        <div className="advance-filter-container">
          <div className="advance-filter-row">
            <div className="col-20 col-span">
              <SelectField
                label="eventType"
                text="Event Type"
                register={register}
                data={eventType}
                errors={errors}
                rules={{ required: false }}
              />
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
              text="SUBMIT"
              class="book-hall"
              onClick={handleSubmit(showFilteredData)}
            />
          </div>
        </div>
      ) : null}

      <table id="hallTable">
        <thead>
          <tr>
            <th>Hall Name</th>
            <th>Category</th>
            <th>Type</th>
            <th>Capacity</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item) => {
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
    </>
  );
}

BookHallScreen.propTypes = {
  item: PropTypes.object,
};

export default BookHallScreen;
