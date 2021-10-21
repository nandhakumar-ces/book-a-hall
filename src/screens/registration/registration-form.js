import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import * as action from "./data/registration-action";
import Button from "../../common/button/button";
import useDate from "../../common/date/date";
import InputField from "../../common/input/input";
import RadioField from "../../common/radio/radio";
import PropTypes from "prop-types";
import "./registration.scss";
import "../../common/radio/radio.scss";
import "../../common/input/input.scss";

function RegistrationForm({ modalOpen, handleModalOpen }) {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    clearErrors,
  } = useForm();

  const genderData = [
    {
      id: 1,
      name: "gender",
      title: "Male",
      value: "male",
    },
    {
      id: 2,
      name: "gender",
      title: "Female",
      value: "female",
    },
  ];

  const registerTypeData = [
    {
      id: 3,
      name: "usertype",
      title: "User  ",
      value: "user",
    },
    {
      id: 3,
      name: "usertype",
      title: "Owner",
      value: "owner",
    },
  ];

  const setAge = (age) => {
    setValue("age", age);
    if (age > 0) clearErrors("age");
  };

  const [calendar, calendarValue] = useDate(
    "Date of Birth",
    true,
    "",
    "",
    "date",
    "",
    setAge
  );

  const registerUser = async (data) => {
    const params = {
      firstName: data.firstName,
      lastName: data.lastName,
      eMail: data.eMail,
      mobileNumber: data.phoneNumber,
      password: data.password,
      gender: data.gender,
      dateOfBirth: calendarValue,
      age: data.age,
      userType: data.type,
    };
    await dispatch(action.fetchRegistration(params));
    handleModalOpen();
  };

  return (
    <>
      {modalOpen === false ? null : (
        <>
          <form className="modal-window">
            <div className="modal-content">
              <div className="form-header">
                <h4>Registration</h4>
                <a onClick={() => handleModalOpen()}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    color="#606771"
                    className="form-icon"
                  />
                </a>
              </div>
              <div className="input-row">
                <div className="col-50">
                  <InputField
                    label="firstName"
                    placeholder="First Name"
                    register={register}
                    errors={errors}
                    rules={{ maxLength: 20, required: true, min: 3 }}
                  />
                </div>
                <div className="col-50 col-span">
                  <InputField
                    label="lastName"
                    placeholder="Last Name"
                    register={register}
                    errors={errors}
                    rules={{ maxLength: 20, required: true, min: 3 }}
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="col-50">
                  <InputField
                    label="eMail"
                    placeholder="E-Mail"
                    register={register}
                    type="email"
                    errors={errors}
                    rules={{ maxLength: 20, required: true, min: 3 }}
                  />
                </div>
                <div className="col-50 col-span">
                  <InputField
                    label="phoneNumber"
                    placeholder="Phone Number"
                    register={register}
                    type="number"
                    errors={errors}
                    rules={{ maxLength: 20, required: true, min: 3 }}
                  />
                </div>
              </div>
              <div style={{ marginTop: "14px" }}>
                <InputField
                  label="password"
                  placeholder="New Password"
                  register={register}
                  type="password"
                  errors={errors}
                  rules={{ maxLength: 20, required: true, min: 3 }}
                />
              </div>
              <div className="radio-container">
                <RadioField
                  label="gender"
                  register={register}
                  data={genderData}
                  errors={errors}
                  rules={{ required: false }}
                />
              </div>
              <div className="input-row">
                <div className="calendar-input">{calendar}</div>
                <div className="col-50 col-span">
                  <h3 className="input-label">Age</h3>
                  {errors?.age?.type === "required" ? (
                    <>
                      <input
                        className="input-error"
                        {...register("age", {
                          required: true,
                          min: 1,
                          max: 99,
                        })}
                      />
                      <FontAwesomeIcon
                        icon={faExclamationCircle}
                        color="#606771"
                        className="err-icon"
                      />
                    </>
                  ) : (
                    <input
                      className="input-area"
                      {...register("age", { required: true, min: 1, max: 99 })}
                    />
                  )}
                </div>
              </div>
              <div className="radio-container">
                <RadioField
                  label="userType"
                  register={register}
                  data={registerTypeData}
                  errors={errors}
                  rules={{ required: false }}
                />
              </div>
              <Button
                text="Register"
                class="sign-up"
                onClick={handleSubmit(registerUser)}
              />
            </div>
          </form>
          <div className="bg" />
        </>
      )}
    </>
  );
}

RegistrationForm.propTypes = {
  modalOpen: PropTypes.bool,
  handleModalOpen: PropTypes.func,
};

export default RegistrationForm;
