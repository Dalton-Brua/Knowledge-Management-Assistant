import React from "react";
import "../styles/FilterDropdown.css";


const FilterDropdown = ({ filterType, setFilterType }) => {
    return (
        <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-dropdown"
        >
            <option value="query">Query</option>
            <option value="response">Response</option>
            <option value="user">User</option>
        </select>
    );
};

export default FilterDropdown;