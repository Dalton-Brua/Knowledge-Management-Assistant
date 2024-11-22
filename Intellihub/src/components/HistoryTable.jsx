import React from "react";
import "../styles/HistoryTable.css";

export const HistoryTable = () => {
    // Example data structure
    const tableData = [
        {
            query: "Common patterns in customer feedback from the past year",
            date: "11/12/2024",
            user: "User2033434675",
        },
        {
            query: "Summary of recent advancements in renewable energy technology",
            date: "11/12/2024",
            user: "User2033493438",
        },
        {
            query: "Current landscape of e-commerce market trends in Asia",
            date: "11/10/2024",
            user: "User2033492066",
        },
        {
            query: "5-year evolution of the demand for data security solutions",
            date: "11/9/2024",
            user: "User2033492236",
        },
        {
            query: "Previous quarterly analysis of remote work productivity",
            date: "11/6/2024",
            user: "User2033499034",
        },
        {
            query: "Latest news articles about emerging blockchain technology",
            date: "11/6/2024",
            user: "User2033494573",
        },
        {
            query: "Latest AI trends in healthcare",
            date: "11/6/2024",
            user: "User2033492034",
        },
        {
            query: "How should I structure a database schema for a healthcare website?",
            date: "11/3/2024",
            user: "User2033493433",
        },
    ];

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
                        <div className="table-cell">{row.date}</div>
                        <div className="table-cell">{row.user}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
