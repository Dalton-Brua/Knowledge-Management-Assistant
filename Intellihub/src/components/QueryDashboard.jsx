import React, { useState } from "react";
import QueryCard from "./QueryCard";
import "../styles/QueryDashboard.css";

const QueryDashboard = () => {
    const [queries, setQueries] = useState([]); // Stores query and response objects
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSendQuery = async () => { // TODO: Implement a way to modify query after submitting
        if (input.trim() === "") { // TODO: Handle other invalid queries
            setError("Please enter a valid query.");
            return;
        }

        setError(""); // Clear any previous errors
        setLoading(true); // Show loading indicator

        try {
            // Send query to backend
            const response = await fetch("http://localhost:5000/query", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: input,
                    user: "testuser", // TODO: Implement a way to hold current user info after login
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch query response.");
            }

            const data = await response.json();

            // Update queries with the new query and response
            setQueries([
                ...queries,
                {
                    query: input,
                    response: data.response || "No response received",
                    timestamp: new Date().toLocaleString(),
                },
            ]);

            setInput(""); // Clear the input field
        } catch (err) {
            console.error(err);
            setError("An error occurred while processing your query.");
        } finally {
            setLoading(false);
        }
    };

    return ( // TODO: Replace with most recent queries from previous session?
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
                {queries.map((queryItem, index) => (
                    <div key={index} className="query-result-card">
                        <p><strong>Query:</strong> {queryItem.query}</p>
                        <p><strong>Response:</strong> {Array.isArray(queryItem.response) ? (
                            <ul>
                                {queryItem.response.map((res, i) => (
                                    <li key={i}>
                                        <strong>Link:</strong> <a href={res.link} target="_blank" rel="noopener noreferrer">{res.link}</a>
                                        <br />
                                        <strong>Summary:</strong> {res.summary}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            queryItem.response
                        )}</p>
                        <p><small><strong>Timestamp:</strong> {queryItem.timestamp}</small></p>
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
                    {loading ? "⏳" : "✈"}
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default QueryDashboard;
