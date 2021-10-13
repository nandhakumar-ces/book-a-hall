import React from "react";
import LoginForm from "./login-form";
import "./login.scss";
import image from "../../assets/images/login.png";

function LoginScreen() {
  return (
    <main className="main-container">
      <div className="login-container">
        <div className="login-container-image">
          <figure>
            <img src={image} width="100%" />
          </figure>
        </div>
        <div className="login-container-form">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}

export default LoginScreen;
