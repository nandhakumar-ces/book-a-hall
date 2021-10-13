/* eslint-disable react/prop-types */
import React from "react";
import "./button.scss";

function Button(props) {
  return (
    <button className={props.type} type="submit" onClick={props.onPress}>
      {props.text}
    </button>
  );
}

export default Button;
