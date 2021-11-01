import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-calendar/dist/Calendar.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";

ReactDOM.render(
  <Provider store={store}>
    <App />
    <ToastContainer hideProgressBar={true} />
  </Provider>,
  document.getElementById("root")
);
