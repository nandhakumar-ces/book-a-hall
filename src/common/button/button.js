/* eslint-disable react/prop-types */
import React from "react";
import "./button.scss";

function Button(props) {
  return (
    <button className={props.class} type="submit" onClick={props.onClick}>
      {props.text}
    </button>
  );
}

export default Button;
