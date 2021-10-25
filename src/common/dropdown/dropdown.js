import React from "react";
import PropTypes from "prop-types";

function SelectField({ label, register, data, text }) {
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
      <select className="input-area" {...register(label)}>
        {data &&
          data.map((item) => <ListItem key={item.id.toString()} item={item} />)}
      </select>
    </>
  );
}

SelectField.propTypes = {
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
};

export default SelectField;
