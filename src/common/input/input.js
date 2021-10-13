/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./input.scss";

function useInput(title, required, control, errors, type, placeholder) {
  const [inputText, setInputtext] = useState("");
  const handleChange = (event) => {
    setInputtext(event.target.value);
  };
  return [
    <>
      <label className="input-label">{title}</label>
      <input
        className="input-area"
        type={type}
        placeholder={placeholder}
        value={inputText}
        onChange={handleChange}
      />
    </>,
    inputText,
  ];
}

export default useInput;
