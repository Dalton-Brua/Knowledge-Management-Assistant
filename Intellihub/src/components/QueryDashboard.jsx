import React, { useState, useEffect } from "react";
import QueryCard from "./QueryCard";
import "../styles/QueryDashboard.css";

const QueryDashboard = () => {
    const [queries, setQueries] = useState([]); // Stores query and response objects
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    let user = sessionStorage.getItem('name');
    useEffect(() => {
        fetch("http://localhost:5000/getLatestQueries", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ user })
        }
        ).then(res => res.json()).then(data => {
            setQueries(data);
        })
    }, [user]);

    const handleSendQuery = async () => { // TODO: Implement a way to modify query after submitting
        if (input.trim() === "") { // TODO: Handle other invalid queries
            return;
        }
        
        var toQuery = input
        var time = new Date().toLocaleString()
        
        setInput(""); // Clear input field
        setLoading(true); // Show loading indicator

        try {
            // Send query to backend
            let currUser = sessionStorage.getItem('name');
            const response = await fetch("http://localhost:5000/query", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: toQuery,
                    user: currUser, // TODO: Implement a way to hold current user info after login
                    timestamp: time,
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
                    timestamp: time,
                },
            ]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
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
        </div>
    );
};

export default QueryDashboard;
