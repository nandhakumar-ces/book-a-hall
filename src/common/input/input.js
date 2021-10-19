/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import "./input.scss";

function InputField({
  label,
  register,
  rules,
  placeholder,
  errors,
  name,
  type,
  screen,
}) {
  if (screen === "login") {
    return (
      <>
        {name && name !== "" ? <h3 className="input-label">{name}</h3> : null}
        <>
          <input
            type={type}
            className="login-error"
            placeholder={placeholder}
            {...register(label, { ...rules })}
            autoFocus
          />
        </>
        {errors[label] && errors[label].type === "required" && (
          <span className="login-alert">This field is required</span>
        )}
      </>
    );
  } else {
    return (
      <>
        {name && name !== "" ? <h3 className="input-label">{name}</h3> : null}
        {errors[label] && errors[label].type === "required" ? (
          <>
            <input
              type={type}
              className="input-error"
              placeholder={placeholder}
              {...register(label, { ...rules })}
              autoFocus
            />
            <FontAwesomeIcon
              icon={faExclamationCircle}
              color="#606771"
              className="err-icon"
            />
          </>
        ) : (
          <input
            type={type}
            className="input-area"
            placeholder={placeholder}
            {...register(label, { ...rules })}
            autoFocus
          />
        )}
      </>
    );
  }
}

InputField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  screen: PropTypes.string,
};

export default InputField;
