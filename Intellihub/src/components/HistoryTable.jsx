
import React from "react";
import { useState, useEffect } from "react";
import "../styles/HistoryTable.css";

export const HistoryTable = () => {
    // Example data structure
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/getAllQueries").then(res => res.json()).then(data => {
            setTableData(data);
        })
    }, []);

    return (
        <div className="history-table">
            <div className="table-header">
                <div className="header-cell">Query</div>
                <div className="header-cell">Date</div>
                <div className="header-cell">User</div>
            </div>
            <div className="table-body">
                {tableData.map((row, index) => (
                    <div key={index} className="table-row">
                        <div className="table-cell">{row.query}</div>
                        <div className="table-cell">{row.timestamp}</div>
                        <div className="table-cell">{row.user}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
