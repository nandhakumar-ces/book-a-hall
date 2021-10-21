import React from "react";
import PropTypes from "prop-types";

function RadioField({ label, register, rules, data }) {
  console.log(register, "reg");
  console.log(rules, "rules");
  const ListItem = ({ item }) => {
    return (
      <label className="radio-inline">
        <input
          type="radio"
          className="radio-input-area"
          value={item.value}
          {...register(label, { ...rules })}
        />
        <span className="radio-input-title">{item.title}</span>
      </label>
    );
  };

  return (
    <div className="radio-container">
      <h3>{label}</h3>
      <div className="radio-group">
        {data &&
          data.map((item) => <ListItem key={item.id.toString()} item={item} />)}
      </div>
    </div>
  );
}

RadioField.propTypes = {
  label: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      title: PropTypes.string,
      value: PropTypes.string,
      checked: PropTypes.bool,
    })
  ),
  item: PropTypes.object,
  rules: PropTypes.object,
  register: PropTypes.func,
};

export default RadioField;
