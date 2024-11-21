import React from "react";
import SideNav from "./SideNav"; // Reusing your existing SideNav component
import QueryCard from "./QueryCard"; // Reusing QueryCard as a modular component
import "../styles/QueryDashboard.css";

const QueryInterface = () => {
    return (
        <div className="query-interface">
            <SideNav /> {/* Reusing the Side Navigation Menu */}

            <div className="content">
                <div className="header">
                    <h1>Query Interface</h1>
                </div>

                <div className="query-card-container">
                    {/* Query Cards */}
                    <QueryCard
                        title="Common patterns in customer feedback from the past year"
                        avatar="avatar-3.png"
                        saveButton="save-query-button-5.svg"
                        deleteButton="delete-query-button-5.svg"
                    />
                    <QueryCard
                        title="Summary of recent advancements in renewable energy technology"
                        avatar="image.png"
                        saveButton="save-query-button-2.svg"
                        deleteButton="delete-query-button-2.svg"
                    />
                    <QueryCard
                        title="Latest news articles about emerging blockchain technology"
                        avatar="avatar-2.png"
                        saveButton="save-query-button-3.svg"
                        deleteButton="delete-query-button-3.svg"
                    />
                </div>
            </div>
        </div>
    );
};

export default QueryInterface;
