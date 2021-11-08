import React from "react";
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
  id,
}) {
  return (
    <>
      {name && name !== "" ? <h3 className="input-label">{name}</h3> : null}
      <>
        <input
          id={id}
          type={type}
          className="login-error"
          placeholder={placeholder}
          {...register(label, { ...rules })}
        />
      </>
      {errors[label] && (
        <span className="login-alert">
          {errors[label].message === ""
            ? "Phone number should have 10 digits"
            : errors[label].message}
        </span>
      )}
    </>
  );
}

InputField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  rules: PropTypes.object,
  register: PropTypes.func,
  errors: PropTypes.object,
  id: PropTypes.string,
};

export default InputField;
