import React, { useState, useEffect } from "react";
import "../styles/HistoryTable.css";
import ActionsCell from "./ActionsCell";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";

export const HistoryTable = ({ isAdmin }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [oldQuery, setOldQuery] = useState("");
    const [newQuery, setNewQuery] = useState("");
    const [tableData, setTableData] = useState([]);
    const [expandedRows, setExpandedRows] = useState({});
    const [filteredData, setFilteredData] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [filterType, setFilterType] = useState("query");

    useEffect(() => {
        fetch("http://localhost:5000/getAllQueries")
            .then((res) => res.json())
            .then((data) => {
                setTableData(data);
                setFilteredData(data);
            });
    }, []);

    useEffect(() => {
        const filtered = tableData.filter((row) => {
            const value = row[filterType]?.toString().toLowerCase();
            return value.includes(searchInput.toLowerCase());
        });
        setFilteredData(filtered);
    }, [searchInput, filterType, tableData]);

    const closeModal = () => {
        setIsModalOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setNewQuery("");
        setOldQuery("");
    };

    const toggleRowExpansion = (index) => {
        setExpandedRows((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const handleEditQuery = () => {
        let user = sessionStorage.getItem("name");
        let timestamp = new Date().toLocaleString();
        fetch("http://localhost:5000/editQuery", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                oldQuery: oldQuery,
                newQuery: newQuery,
                user: user,
                timestamp: timestamp,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setTableData(data);
            });

        closeModal();
    };

    const editQuery = (query) => {
        setOldQuery(query);
        setIsModalOpen(true);
    };

    const deleteQuery = (query) => {
        fetch("http://localhost:5000/deleteQuery", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: query }),
        })
            .then((res) => res.json())
            .then((data) => {
                setTableData(data);
            });
    };

    return (
        <div className="history-table-container">
            <SearchBar
                placeholder="Search query by filter"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <div className="filter-container">
                <h4>Filter Type</h4>
                <FilterDropdown
                    filterType={filterType}
                    setFilterType={setFilterType}
                ></FilterDropdown>
            </div>
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
                    {filteredData.map((row, index) => (
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
                                        <strong>Query Title:</strong>
                                        <p>{row.query || "No title available"}</p>
                                        <strong>Response:</strong>
                                        <p>{row.response || "No response available"}</p>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Edit Query</h2>
                        <form onSubmit={handleEditQuery}>
                            <div className="form-group">
                                <label>Old Query</label>
                                <h5>{oldQuery}</h5>
                            </div>
                            <div className="form-group">
                                <label>New Query</label>
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
