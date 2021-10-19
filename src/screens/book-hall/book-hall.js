/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as action from "./data/book-hall-action";
import InputField from "../../common/input/input";
import Button from "../../common/button/button";
import "./book-hall.scss";

function BookHallScreen() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.bookHallReducer.data);
  console.log(data);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  useEffect(() => {
    dispatch(action.getHallListData());
  }, []);

  return (
    <div className="book-hall-container">
      <div className="book-hall-header">Book Your Hall</div>
      <div className="book-hall-content"></div>
    </div>
  );
}

export default BookHallScreen;
