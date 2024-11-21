import React from "react";
import SideNav from "./SideNav";
import QueryTable from "./QueryTable";
import SearchBar from "./SearchBar";
import "../styles/SavedQueries.css";

const SavedQueries = () => {
    return (
        <div className="saved-queries">
            <SideNav /> {/* Reusable SideNav component */}
            <div className="content">
                <h1 className="page-title">Saved Queries</h1>
                <SearchBar placeholder="Search queries" />
                <QueryTable />
            </div>
        </div>
    );
};

export default SavedQueries;
