import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as action from "./data/register-hall-action";
import Button from "../../common/button/button";
import InputField from "../../common/input/input";
import authProvider from "../../common/utils";
import { hallType } from "../../constants";
import RadioField from "../../common/radio/radio";
import "./register-hall.scss";

function RegisterHallScreen() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [hallCategory, setHallCategory] = useState("birthday");
  const [userDetails] = useState(authProvider());
  const toastId = useRef(null);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const {
    loading = false,
    error = false,
    data,
  } = useSelector((state) => state.hallRegistrationReducer.hallRegister);

  const showCustomInput = () => {
    let value = document.getElementById("hallCategory").value;
    setHallCategory(value);
  };

  const showLoader = () =>
    (toastId.current = toast("Registering hall, please wait...", {
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
      render: "Hall registerd successfully",
      type: toast.TYPE.SUCCESS,
      autoClose: 2000,
    });

  const registerHall = (data) => {
    let customCategory = "";
    if (data.customCategory !== undefined)
      customCategory = data?.customCategory;
    const params = {
      hallName: data.hallName,
      hallPrice: data.hallPrice,
      halltype: data.halltype,
      capacity: data.capacity,
      hallCategory: data.hallCategory,
      customCategory: customCategory,
      hallOwner: userDetails._id,
    };
    dispatch(action.fetchRegistration(params));
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
            delete data.type;
            history.push("/dashboard");
          }
        }, 2000);
      }
    }
  }, [loading]);

  return (
    <div className="register-hall-container">
      <div className="register-hall-header">Register your hall</div>
      <div className="register-hall-content">
        <div className="register-hall-form">
          <div className="input-row">
            <div>
              <InputField
                label="hallName"
                placeholder=""
                register={register}
                name="Hall Name *"
                errors={errors}
                rules={{
                  required: "Hall name is required",
                }}
              />
            </div>
            <div className="col-span">
              <InputField
                label="hallPrice"
                placeholder=""
                register={register}
                name="Estimated Price *"
                errors={errors}
                type="number"
                rules={{
                  required: "Price is required",
                }}
              />
            </div>
          </div>
          <div className="input-row">
            <div className="radio-container">
              <RadioField
                label="halltype"
                text="Hall Type *"
                register={register}
                data={hallType}
                errors={errors}
                rules={{ required: true }}
              />
            </div>
            <div className="col-span">
              <InputField
                label="capacity"
                placeholder=""
                register={register}
                name="Capacity *"
                errors={errors}
                type="number"
                rules={{
                  required: "Capacity is required",
                }}
              />
            </div>
          </div>
          <div className="input-row">
            <div>
              <h3>Hall Category *</h3>
              <select
                id="hallCategory"
                className="input-area"
                {...register("hallCategory")}
                onChange={showCustomInput}
              >
                <option value="birthday">Birthday</option>
                <option value="conference">Conference</option>
                <option value="marriage">Marriage</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            {hallCategory === "custom" ? (
              <div className="col-span">
                <InputField
                  label="customCategory"
                  placeholder=""
                  register={register}
                  name="New Category"
                  errors={errors}
                  rules={{ required: "Custom category is required" }}
                />
              </div>
            ) : null}
          </div>
          <div className="register-submit-btn">
            <span>*Required field(s)</span>
            <Button
              text="Submit"
              className="register-hall"
              onClick={handleSubmit(registerHall)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterHallScreen;
