/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import * as action from "./data/registration-action";
import useInput from "../../common/input/input";
import useRadio from "../../common/radio/radio";
import Button from "../../common/button/button";
import "./registration.scss";

function RegistrationForm(props) {
  const dispatch = useDispatch();
  const genderData = [
    {
      id: "male",
      name: "gender",
      title: "Male",
    },
    {
      id: "female",
      name: "gender",
      title: "Female",
    },
  ];
  const userData = [
    {
      id: "user",
      name: "type",
      title: "User",
    },
    {
      id: "owner",
      name: "type",
      title: "Owner",
    },
  ];
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [firstname, firstnameValue] = useInput(
    "",
    true,
    control,
    errors,
    "text",
    "First Name"
  );
  const [lastname, lastnameValue] = useInput(
    "",
    true,
    control,
    errors,
    "text",
    "Last Name"
  );
  const [mobilenumber, mobilenumberValue] = useInput(
    "",
    true,
    control,
    errors,
    "tel",
    "Mobile Number"
  );
  const [gender, genderValue] = useRadio(genderData, "Gender");
  const [age, ageValue] = useInput("", true, control, errors, "number", "Age");
  const [userType, userTypeuserTypeValue] = useRadio(userData, "Register as");

  const registerUser = () => {
    const data = {
      firstName: firstnameValue,
      lastName: lastnameValue,
      mobileNumber: mobilenumberValue,
      password: "12345678",
      gender: genderValue,
      dateOfBirth: document.getElementById("birthday").value,
      age: ageValue,
      userType: userTypeuserTypeValue,
    };
    dispatch(action.fetchRegistration(data));
  };

  return (
    <>
      {props.modalOpen === false ? null : (
        <>
          <div className="modal-window">
            <div className="modal-content">
              <div className="form-header">
                <h4>Registration</h4>
                <a onClick={() => props.handleModalOpen()}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    size="5x"
                    color="#606771"
                    className="form-icon"
                  />
                </a>
              </div>
              <div className="input-row">
                {firstname}
                {lastname}
              </div>
              {mobilenumber}
              {gender}
              <div className="input-row">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flexBasis: "50%",
                  }}
                >
                  <h3>Date of birth</h3>
                  <input type="date" id="birthday" className="calendar" />
                </div>
                <div style={{ marginTop: "3rem", flexBasis: "50%" }}>{age}</div>
              </div>
              {userType}
              <Button text="Register" type="sign-up" onPress={registerUser} />
            </div>
          </div>
          <div className="bg" />
        </>
      )}
    </>
  );
}

export default RegistrationForm;
