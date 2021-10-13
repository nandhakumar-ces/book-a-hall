/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as action from "./data/login-action";
import useInput from "../../common/input/input";
import Button from "../../common/button/button";
import RegistrationForm from "../registration/registration-form";

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [username, usernameValue] = useInput(
    "Username",
    true,
    control,
    errors,
    "tel",
    "Email or Phone Number"
  );
  const [password, passwordValue] = useInput(
    "Password",
    true,
    control,
    errors,
    "password",
    "Password"
  );
  const handleModalOpen = () => setModalOpen((previousSate) => !previousSate);
  const verifyLogin = () => {
    const data = {
      username: usernameValue,
      password: "12345678",
    };
    dispatch(action.fetchLogin(data, history));
  };
  return (
    <>
      <div className="login-form">
        <h1>Login</h1>
        <h2>Login to your account</h2>
        <p>
          Thank you for get back to Book a Hall, lets access our the best
          recommendation for you
        </p>
        {username}
        {password}
        <Button text="Sign In" type="sign-in" onPress={verifyLogin} />
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
