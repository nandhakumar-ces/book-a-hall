/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as action from "./data/login-action";
import InputField from "../../common/input/input";
import Button from "../../common/button/button";
import RegistrationForm from "../registration/registration-form";

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const handleModalOpen = () => setModalOpen((previousSate) => !previousSate);
  const verifyLogin = (data) => {
    const params = {
      username: data.userName,
      password: data.password,
    };
    dispatch(action.fetchLogin(params, history));
  };
  return (
    <>
      <div className="login-form">
        <h2>Login to your account</h2>
        <p>
          Thank you for get back to Book a Hall, lets access our the best
          recommendation for you
        </p>
        <InputField
          label="userName"
          placeholder="Email or Phone Number"
          register={register}
          name="User Name"
          errors={errors}
          rules={{ maxLength: 20, required: true, min: 3 }}
          screen="login"
        />
        <InputField
          label="password"
          placeholder="Password"
          register={register}
          name="Password"
          errors={errors}
          type="password"
          rules={{ maxLength: 20, required: true, min: 3 }}
          screen="login"
        />
        <div className="sign-in-btn">
          <Button
            text="Sign In"
            type="sign-in"
            onPress={handleSubmit(verifyLogin)}
          />
        </div>
        <p>
          Don&apos;t have an account yet?{" "}
          <a onClick={handleModalOpen} className="nav-link">
            Click here to register
          </a>
        </p>
      </div>
      <RegistrationForm
        modalOpen={modalOpen}
        handleModalOpen={handleModalOpen}
      />
    </>
  );
}

export default LoginForm;
