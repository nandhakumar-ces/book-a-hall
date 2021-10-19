import React from "react";
import NoData from "../../assets/svg/not-found.svg";

const BookRequestScreen = () => {
  return (
    <figure className="no-data">
      <img src={NoData} height="100%" />
    </figure>
  );
};
export default BookRequestScreen;
