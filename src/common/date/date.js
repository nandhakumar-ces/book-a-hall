/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./date.scss";

function useDate(title, required, control, errors, type, placeholder, setAge) {
  const [inputText, setInputtext] = useState("");
  const handleChange = (event) => {
    const today = new Date();
    const birthDate = new Date(event.target.value);
    const age = today.getFullYear() - birthDate.getFullYear();
    setInputtext(event.target.value);
    setAge(age);
  };
  return [
    <>
      <h3 className="date-label">{title}</h3>
      <input
        className="date-area"
        type={type}
        placeholder={placeholder}
        value={inputText}
        onChange={handleChange}
      />
    </>,
    inputText,
  ];
}

export default useDate;
