import React from "react";
import "../styles/SearchBar.css";

const SearchBar = ({ placeholder }) => {
    return (
        <div className="search-bar">
            <input type="text" className="search-input" placeholder={placeholder} />
            <button className="search-icon">🔍</button> {/* Replace with SVG or icon library */}
        </div>
    );
};

export default SearchBar;