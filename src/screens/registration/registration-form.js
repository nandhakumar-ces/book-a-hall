import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
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

function RegistrationForm({ handleModalOpen }) {
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
    document.getElementById("userAge").disabled = true;
  }, [loading]);

  return (
    <>
      <div className="input-row">
        <div>
          <InputField
            label="firstName"
            placeholder="First Name"
            register={register}
            errors={errors}
            rules={{
              required: "First name is required",
            }}
          />
        </div>
        <div className="col-span">
          <InputField
            label="lastName"
            placeholder="Last Name"
            register={register}
            errors={errors}
            rules={{
              required: "Last name is required",
            }}
          />
        </div>
      </div>
      <div className="input-row">
        <div>
          <InputField
            label="eMail"
            placeholder="E-Mail"
            register={register}
            type="email"
            errors={errors}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Enter valid email",
              },
            }}
          />
        </div>
        <div className="col-span">
          <InputField
            label="phoneNumber"
            placeholder="Phone Number"
            register={register}
            type="number"
            errors={errors}
            rules={{
              required: "Phone number is required",
              minLength: 10,
              maxLength: 10,
            }}
          />
        </div>
      </div>
      <div className="input-row" style={{ gridTemplateColumns: "auto" }}>
        <div>
          <InputField
            label="password"
            placeholder="New Password"
            register={register}
            type="password"
            errors={errors}
            rules={{
              required: "Password is required",
            }}
          />
        </div>
      </div>
      <div className="input-row">
        <div className="calendar-input">{calendar}</div>
        <div className="col-span">
          <InputField
            label="age"
            name="Age"
            id="userAge"
            register={register}
            type="number"
            errors={errors}
            rules={{
              required: "Age is required",
              min: 1,
            }}
          />
        </div>
      </div>
      <div className="row">
        <RadioField
          text={"Gender"}
          label="gender"
          register={register}
          data={genderData}
          errors={errors}
          rules={{ required: true }}
        />
        <div className="col-50 col-span">
          <RadioField
            label="userType"
            text={"Register as"}
            register={register}
            data={registerTypeData}
            errors={errors}
            rules={{ required: true }}
          />
        </div>
      </div>
      <Button
        text="Register"
        className="sign-up"
        onClick={handleSubmit(registerUser)}
      />
    </>
  );
}

RegistrationForm.propTypes = {
  handleModalOpen: PropTypes.func,
};

export default RegistrationForm;
