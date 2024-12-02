import React from "react";
import { useState, useEffect } from "react";
import { HistoryTable } from "./HistoryTable"; // Import the HistoryTable component
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
