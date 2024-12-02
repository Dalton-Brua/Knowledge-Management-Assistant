import React from "react";
import "../styles/SearchBar.css";

const SearchBar = ({ placeholder, value, onChange }) => {
    return (
        <div className="search-bar">
            <input type="text"
            className="search-input"
            placeholder={placeholder}
            value = {value || ""}
            onChange = {onChange}
            />
        </div>
    );
};

export default SearchBar;