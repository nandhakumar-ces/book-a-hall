import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as action from "./data/login-action";
import InputField from "../../common/input/input";
import Button from "../../common/button/button";
import RegistrationForm from "../registration/registration-form";
import { toast } from "react-toastify";
import { userDetails } from "../../constants";

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const toastId = useRef(null);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const {
    loading = false,
    error = false,
    data = {},
  } = useSelector((state) => state.loginReducer.login);

  const showLoader = () =>
    (toastId.current = toast("Verifying, please wait...", {
      type: toast.TYPE.INFO,
      autoClose: false,
    }));

  const showError = () =>
    toast.update(toastId.current, {
      render: "Invalid username or password",
      type: toast.TYPE.ERROR,
      autoClose: 2000,
    });

  const showSuccess = () =>
    toast.update(toastId.current, {
      render: "Logged in successfully",
      type: toast.TYPE.SUCCESS,
      autoClose: 2000,
    });

  const handleModalOpen = () => setModalOpen((previousSate) => !previousSate);
  const verifyLogin = (data) => {
    const params = {
      username: data.userName,
      password: data.password,
    };
    dispatch(action.fetchLogin(params));
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
            sessionStorage.setItem("isLoggedIn", true);
            sessionStorage.setItem(
              userDetails.USERDETAILS,
              JSON.stringify(data.response)
            );
            history.push("/dashboard");
          }
        }, 2000);
      }
    }
  }, [loading]);

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
            className="sign-in"
            onClick={handleSubmit(verifyLogin)}
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
