import React, { useState, useEffect } from "react";
import "../styles/HistoryTable.css";
import ActionsCell from "./ActionsCell";

export const HistoryTable = ({ isAdmin }) => {
    const [tableData, setTableData] = useState([]);
    const [expandedRows, setExpandedRows] = useState({}); 

    useEffect(() => {
        fetch("http://localhost:5000/getAllQueries")
            .then((res) => res.json())
            .then((data) => {
                setTableData(data);
            });
    }, []);

    const toggleRowExpansion = (index) => {
        setExpandedRows((prev) => ({
            ...prev,
            [index]: !prev[index], 
        }));
    };

    const editQuery = (query) => {
        console.log("Edit query:", query);
    };

    const deleteQuery = (query) => {
        console.log("Delete query:", query);
    };

    return (
        <div className="history-table-container">
            <table className="history-table">
                <thead>
                    <tr className="table-header">
                        <th className="header-cell">Query</th>
                        <th className="header-cell">Date</th>
                        <th className="header-cell">User</th>
                        <th className="header-cell actions-header">Actions</th>
                    </tr>
                </thead>
                <tbody className="table-body">
                    {tableData.map((row, index) => (
                        <React.Fragment key={index}>
                            {/* Main row */}
                            <tr
                                className="table-row"
                                onClick={() => toggleRowExpansion(index)}
                            >
                                <td className="table-cell">{row.query}</td>
                                <td className="table-cell">{row.timestamp}</td>
                                <td className="table-cell">{row.user}</td>
                                <td className="table-cell actions-cell">
                                    <ActionsCell
                                        onEdit={() => editQuery(row.query)}
                                        onDelete={() => deleteQuery(row.query)}
                                        isAdmin={isAdmin}
                                    />
                                </td>
                            </tr>

                            {/* Expanded row */}
                            {expandedRows[index] && (
                                <tr className="expanded-row">
                                    <td className="expanded-cell" colSpan="4">
                                        <strong>Response:</strong>
                                        <p>{row.response || "No response available"}</p>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
