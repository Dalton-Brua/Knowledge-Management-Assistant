import React from "react";
import { useState, useEffect } from "react";
import { HistoryTable } from "./HistoryTable"; // Import the HistoryTable component
import SearchBar from "./SearchBar"; // Assuming SearchBar is already created
import "../styles/SavedQueries.css";

const SavedQueries = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        if (sessionStorage.getItem("role") === "Admin") {
            setIsAdmin(true);
        }
    }, [])
    return (
        <div className="saved-queries">
            <div className="content">
                <h1 className="page-title">Saved Queries</h1>
                <SearchBar placeholder="Search queries" /> {/* Search bar at the top */}
                <div className="history-table-container">
                    <HistoryTable
                    isAdmin={isAdmin}
                    /> 
                </div>
            </div>
        </div>
    );
};

export default SavedQueries;
