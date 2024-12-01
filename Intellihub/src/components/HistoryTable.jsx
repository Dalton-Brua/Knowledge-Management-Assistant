import React from "react";
import { useState, useEffect } from "react";
import "../styles/HistoryTable.css";
import ActionsCell from "./ActionsCell";

export const HistoryTable = ({ isAdmin }) => {

    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/getAllQueries").then(res => res.json()).then(data => {
            setTableData(data);
        })
    }, []);

    const editQuery = (query) => {

    }
    const deleteQuery = (query) => {

    }
    const showQuery = (query) => {

    }

    return (
        <div className="history-table-container">
            <table className="history-table">
                <thead>
                    <tr className="table-header">
                        <th className="header-cell">Query</th>
                        <th className="header-cell">Date</th>
                        <th className="header-cell">User</th>
                        <th className="header-cell">Actions</th>
                    </tr>
                </thead>
                <tbody className="table-body">
                    {tableData.map((row, index) => (
                        <tr key={index} className="table-row" onClick={showQuery(row)}>
                            <td className="table-cell">{row.query}</td>
                            <td className="table-cell">{row.timestamp}</td>
                            <td className="table-cell">{row.user}</td>
                            <td className="table-cell">
                                <ActionsCell
                                    onEdit={() => editQuery(row.query)}
                                    onDelete={() => deleteQuery(row.query)}
                                    isAdmin={isAdmin}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
