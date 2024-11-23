import React, { useState } from "react";
import QueryCard from "./QueryCard";
import "../styles/QueryDashboard.css";

const QueryDashboard = () => {
    const [queries, setQueries] = useState([]);
    const [input, setInput] = useState("");

    const handleSendQuery = () => {
        if (input.trim() !== "") {
            setQueries([...queries, input]); // Add the query to the list
            setInput(""); // Clear the input field
        }
    };

    return (
        <div className="query-dashboard">
            <div className="dashboard-content">
                <div className="query-cards-container">
                    <QueryCard
                        title="Customer Feedback"
                        description="Common patterns in customer feedback from the past year"
                    />
                    <QueryCard
                        title="Renewable Energy"
                        description="Summary of recent advancements in renewable energy technology"
                    />
                    <QueryCard
                        title="Blockchain Trends"
                        description="Latest news articles about emerging blockchain technology"
                    />
                </div>
            </div>

            <div className="query-results-container">
                {queries.map((query, index) => (
                    <div key={index} className="query-result-card">
                        <p>{query}</p>
                    </div>
                ))}
            </div>

            <div className="input-container">
                <input
                    type="text"
                    className="input-box"
                    placeholder="Type your query here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendQuery()}
                />
                <button className="send-button" onClick={handleSendQuery}>
                ✈
                </button>
            </div>
        </div>
    );
};

export default QueryDashboard;
