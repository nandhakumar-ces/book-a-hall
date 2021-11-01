import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
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
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { registerTypeData, genderData } from "../../constants";
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
    reset,
  } = useForm();
  const toastId = useRef(null);
  const {
    loading = false,
    error = false,
    data,
  } = useSelector((state) => state.registrationReducer.registration);

  const setAge = (age) => {
    setValue("age", age);
    if (age > 0) clearErrors("age");
  };

  const [calendar, calendarValue] = useDate(
    "Date of Birth",
    "date",
    "",
    setAge
  );

  const showLoader = () =>
    (toastId.current = toast("Registration in progress, please wait...", {
      type: toast.TYPE.INFO,
      autoClose: false,
    }));

  const showError = () =>
    toast.update(toastId.current, {
      render: "Email or Phone number already exists, please try again",
      type: toast.TYPE.ERROR,
      autoClose: 2000,
    });

  const showSuccess = () =>
    toast.update(toastId.current, {
      render: "Registration completed successfully",
      type: toast.TYPE.SUCCESS,
      autoClose: 2000,
    });

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
      userType: data.userType,
    };
    await dispatch(action.fetchRegistration(params));
  };

  const clearRegistrationForm = () => {
    reset({
      firstName: "",
      lastName: "",
      eMail: "",
      phoneNumber: "",
      password: "",
    });
  };

  useEffect(() => {
    if (loading) {
      showLoader();
    } else {
      if (error) {
        setTimeout(() => {
          showError();
        }, 2000);
      } else {
        setTimeout(() => {
          showSuccess();
          if (Object.entries(data).length > 0) {
            clearRegistrationForm();
            handleModalOpen();
          }
        }, 2000);
      }
    }
  }, [loading]);

  return (
    <>
      {!modalOpen ? null : (
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
                    rules={{ required: true }}
                  />
                </div>
                <div className="col-50 col-span">
                  <InputField
                    label="lastName"
                    placeholder="Last Name"
                    register={register}
                    errors={errors}
                    rules={{ required: true }}
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
                    rules={{ required: true }}
                  />
                </div>
                <div className="col-50 col-span">
                  <InputField
                    label="phoneNumber"
                    placeholder="Phone Number"
                    register={register}
                    type="number"
                    errors={errors}
                    rules={{ required: true }}
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
                  rules={{ required: true }}
                />
              </div>
              <div className="radio-container">
                <RadioField
                  label="gender"
                  register={register}
                  data={genderData}
                  errors={errors}
                  rules={{ required: true }}
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
                        {...register("age", { required: true, min: 1 })}
                        disabled
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
                      {...register("age", { required: true, min: 1 })}
                      disabled
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
                  rules={{ required: true }}
                />
              </div>
              <Button
                text="Register"
                className="sign-up"
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
