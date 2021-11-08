import React from "react";
import PropTypes from "prop-types";

function RadioField({ label, register, rules, data, text, errors }) {
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
      <h3>{text}</h3>
      {errors[label] && errors[label].type === "required" ? (
        <div className="radio-group-error">
          {data &&
            data.map((item) => (
              <ListItem key={item.id.toString()} item={item} />
            ))}
        </div>
      ) : (
        <div className="radio-group">
          {data &&
            data.map((item) => (
              <ListItem key={item.id.toString()} item={item} />
            ))}
        </div>
      )}
    </div>
  );
}

RadioField.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string,
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
  errors: PropTypes.object,
};

export default RadioField;
