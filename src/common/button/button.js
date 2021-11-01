import React from "react";
import "./button.scss";
import PropTypes from "prop-types";

function Button({ text, className, onClick }) {
  return (
    <button className={className} type="submit" onClick={onClick}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
