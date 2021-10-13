/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./radio.scss";

function useRadio(data, title) {
  const [selectedData, setSelectedData] = useState();

  const handleChange = (event) => {
    setSelectedData(event.target.value);
  };

  const ListItem = ({ item }) => {
    return (
      <label className="radio-inline">
        <input
          type="radio"
          name={item.name}
          id={item.id}
          value={item.id}
          onChange={handleChange}
        />
        <span>{item.title}</span>
      </label>
    );
  };

  return [
    <div className="radio-container">
      <h3>{title}</h3>
      <div className="radio-group">
        {data &&
          data.map((item) => <ListItem key={item.id.toString()} item={item} />)}
      </div>
    </div>,
    selectedData,
  ];
}

export default useRadio;
