import React from "react";
import { useState, useEffect } from "react";
import "../styles/HistoryTable.css";
import ActionsCell from "./ActionsCell";

export const HistoryTable = ({ isAdmin }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [oldQuery, setOldQuery] = useState("");
    const [newQuery, setNewQuery] = useState("");

    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/getAllQueries").then(res => res.json()).then(data => {
            setTableData(data);
        })
    }, []);

    const closeModal = () => {
        setIsModalOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setNewQuery("");
        setOldQuery("");
    };

    const editQuery = (query) => {
        if (!isModalOpen) {
            setOldQuery(query);
            setIsModalOpen(true);
        } else {
            // let user = sessionStorage.getItem('name');
            let timestamp = new Date().toLocaleString();
            fetch("http://localhost:5000/editQuery", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({"oldQuery": oldQuery, "newQuery": newQuery, /*"user": user,*/ "timestamp": timestamp}),
            }).then(res => res.json()).then(data => {
                setTableData(data);
            });
        }

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
            {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h2>Edit Query</h2>
                            <form onSubmit={editQuery}>
                                <div className="form-group">
                                    <label>Old Query</label>
                                    <h5>{oldQuery}</h5>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="newQuery">New Query</label>
                                    <input
                                        value={newQuery}
                                        onChange={(e) => setNewQuery(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-actions">
                                    <button type="submit" className="submit-btn">
                                        Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        className="cancel-btn"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
        </div>
        
    );
};
