import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import * as action from "./data/profile-action";
import Button from "../../common/button/button";
import useDate from "../../common/date/date";
import InputField from "../../common/input/input";
import RadioField from "../../common/radio/radio";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { genderData } from "../../constants";
import authProvider from "../../common/utils";
import moment from "moment";
import * as User from "../../constants";

function EditProfileScreen({ modalOpen, handleModalOpen }) {
  const dispatch = useDispatch();
  const [userDetails] = useState(authProvider());
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    clearErrors,
  } = useForm();
  const toastId = useRef(null);
  const {
    loading = false,
    error = false,
    data,
  } = useSelector((state) => state.profileReducer.profile);

  const setAge = (age) => {
    setValue("age", age);
    if (age > 0) clearErrors("age");
  };

  const [calendar, calendarValue] = useDate(
    "Date of Birth *",
    "date",
    "",
    setAge,
    moment(userDetails.dateOfBirth).format("YYYY-MM-DD")
  );

  const showLoader = () =>
    (toastId.current = toast("Updating Profile, please wait...", {
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
      render: "Profile updated successfully",
      type: toast.TYPE.SUCCESS,
      autoClose: 2000,
    });

  const updateUser = async (data) => {
    const params = {
      _id: userDetails._id,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      gender: data.gender,
      dateOfBirth: calendarValue,
      age: data.age,
    };
    await dispatch(action.updateProfileRequest(params));
  };

  function showPassword() {
    var x = document.getElementById("my-password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  useEffect(() => {
    setValue("firstName", userDetails.firstName);
    setValue("lastName", userDetails.lastName);
    setValue("password", userDetails.password);
    setValue("gender", userDetails.gender);
    setValue("age", userDetails.age);
  }, []);

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
            sessionStorage.setItem(
              User.userDetails.USERDETAILS,
              JSON.stringify(data.response)
            );
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
            <div className="modal-content" style={{ boxShadow: "none" }}>
              <div className="form-header">
                <h4>Edit Profile</h4>
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
                    name="First Name *"
                    register={register}
                    errors={errors}
                    rules={{ required: true }}
                  />
                </div>
                <div className="col-50 col-span">
                  <InputField
                    label="lastName"
                    name="Last Name *"
                    register={register}
                    errors={errors}
                    rules={{ required: true }}
                  />
                </div>
              </div>
              <div style={{ marginTop: "14px" }}>
                <InputField
                  id="my-password"
                  label="password"
                  name="Password *"
                  register={register}
                  type="password"
                  errors={errors}
                  rules={{ required: true }}
                />
              </div>
              <div style={{ marginTop: "10px" }}>
                <input type="checkbox" onClick={showPassword} />
                Show Password
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
              <Button
                text="Update"
                className="sign-up"
                onClick={handleSubmit(updateUser)}
              />
            </div>
          </form>
          <div className="bgProfile" />
        </>
      )}
    </>
  );
}

EditProfileScreen.propTypes = {
  modalOpen: PropTypes.bool,
  handleModalOpen: PropTypes.func,
};

export default EditProfileScreen;
