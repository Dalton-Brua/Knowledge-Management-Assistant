import React from "react";
import  { useState, useEffect } from "react";
import "../styles/RecentlyDeletedTable.css";

const RecentlyDeletedTable = ( { queries } ) => {

    const [deletedQueries, setDeletedQueries] = useState([]);
    useEffect(() => {
        setDeletedQueries(queries);
    }, [queries]);

    const onRestore = (queryToRestore) => {
        fetch('http://localhost:5000/restoreQuery', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: queryToRestore }),
        }).then(res => res.json()).then(data => {
            setDeletedQueries(data);
        });
    }
    
    const onDelete = (queryToDelete) => {
        fetch('http://localhost:5000/finalDelete', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: queryToDelete }),
        }).then(res => res.json()).then(data => {
            setDeletedQueries(data);
        });
    }
    return (
        <div className="deleted-table-container">
            <table className="deleted-table">
                <thead>
                    <tr>
                        <th className="query-column">Query</th>
                        <th className="deleted-by-column">Deleted By</th>
                        <th className="actions-column">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {deletedQueries.map((query) => (
                        <tr key={query.id}>
                            <td className="query-column">{query.original.query}</td>
                            <td className="deleted-by-column">{query.deletedBy}</td>
                            <td className="actions-column">
                                <button
                                    className="restore-button"
                                    onClick={() => onRestore(query.original.query)}
                                >
                                    Restore
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => onDelete(query.original.query)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RecentlyDeletedTable