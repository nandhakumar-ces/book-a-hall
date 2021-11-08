import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

function SearchBar({ searchHallName }) {
  return (
    <>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          id="searchInput"
          className="search-input"
          placeholder="Search Hall Name.."
          onKeyUp={searchHallName}
        />
        <button className="search-button">
          <FontAwesomeIcon icon={faSearch} color="#606771" />
        </button>
      </div>
    </>
  );
}

SearchBar.propTypes = {
  searchHallName: PropTypes.func,
};

export default SearchBar;
