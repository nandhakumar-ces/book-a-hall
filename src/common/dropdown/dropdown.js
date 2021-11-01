import React from "react";
import PropTypes from "prop-types";

function SelectField({ id, label, register, data, text, onChange }) {
  const ListItem = ({ item }) => {
    return (
      <>
        <option value={item.value}>{item.title}</option>
      </>
    );
  };

  return (
    <>
      <h3>{text}</h3>
      <select
        id={id}
        className="input-area"
        onChange={onChange}
        {...register(label)}
      >
        {data &&
          data.map((item) => <ListItem key={item.id.toString()} item={item} />)}
      </select>
    </>
  );
}

SelectField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  text: PropTypes.string,
  register: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.string,
      title: PropTypes.string,
    })
  ),
  item: PropTypes.object,
  onChange: PropTypes.func,
};

export default SelectField;
