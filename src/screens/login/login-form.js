import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as action from "./data/login-action";
import InputField from "../../common/input/input";
import Button from "../../common/button/button";
import RegistrationForm from "../registration/registration-form";
import { toast } from "react-toastify";
import { userDetails, apiParams } from "../../constants";
import image from "../../assets/images/login.png";
import imageRegister from "../../assets/images/register.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();
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

  function validateEmail(emailAdress) {
    let regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (emailAdress.match(regexEmail)) {
      return true;
    } else {
      return false;
    }
  }

  function validatePhoneNumber(num) {
    return !isNaN(num);
  }

  const checkUsernameType = (value) => {
    if (validateEmail(value)) return apiParams.EMAIL;
    else if (validatePhoneNumber(value)) return apiParams.PHONENUMBER;
    else return false;
  };

  const verifyLogin = async (data) => {
    const type = await checkUsernameType(data.userName);
    if (type) {
      const params = {
        username: data.userName,
        password: data.password,
        type: type,
      };
      dispatch(action.fetchLogin(params));
    } else
      return toast.error("Enter valid email or phone number", {
        autoClose: 2000,
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

  function toggleForm() {
    var container = document.querySelector(".launch-container");
    container.classList.toggle("active");
  }

  return (
    <>
      <div className="launch-container">
        <div className="user signin-container">
          <div className="img-container">
            <img src={image} />
          </div>
          <div className="form-area">
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
                rules={{
                  required: "Username is required",
                }}
              />
              <InputField
                label="password"
                placeholder="Password"
                register={register}
                name="Password"
                errors={errors}
                type="password"
                rules={{
                  required: "Password is required",
                }}
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
                <a onClick={toggleForm} className="nav-link">
                  Click here to register
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="user signupContainer">
          <div className="form-area">
            <div className="login-form">
              <p>
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  color={"#1a73e8"}
                  style={{ marginRight: "5px" }}
                />
                <a onClick={toggleForm} className="nav-link">
                  Back to sign in
                </a>
              </p>
              <h2 style={{ marginBottom: "8%" }}>
                Let&apos;s create your account
              </h2>
              <RegistrationForm handleModalOpen={toggleForm} />
            </div>
          </div>
          <div className="img-container" style={{ width: "40%" }}>
            <img src={imageRegister} />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
