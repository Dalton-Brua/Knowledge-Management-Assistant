import React from "react";
import { HistoryTable } from "./HistoryTable"; // Import the HistoryTable component
import SearchBar from "./SearchBar"; // Assuming SearchBar is already created
import "../styles/SavedQueries.css";

const SavedQueries = () => {
    return (
        <div className="saved-queries">
            <div className="content">
                <h1 className="page-title">Saved Queries</h1>
                <SearchBar placeholder="Search queries" /> {/* Search bar at the top */}
                <div className="history-table-container">
                    <HistoryTable /> {/* Render the HistoryTable */}
                </div>
            </div>
        </div>
    );
};

export default SavedQueries;