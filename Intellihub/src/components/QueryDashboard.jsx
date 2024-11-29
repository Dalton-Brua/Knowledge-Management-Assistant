import React, { useState, useEffect } from "react";
import QueryCard from "./QueryCard";
import "../styles/QueryDashboard.css";

const QueryDashboard = () => {
    const [queries, setQueries] = useState([]);
    const [input, setInput] = useState(""); // State for the input field
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/getLatestQueries")
            .then((res) => res.json())
            .then((data) => {
                setQueries(data);
            });
    }, []);

    const handleSendQuery = async () => {
        if (input.trim() === "") {
            setError("Please enter a valid query.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/query", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: input,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch query response.");
            }

            const data = await response.json();

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

    return (
        <div className="query-dashboard">
            <div className="dashboard-content">
                <div className="query-cards-container">
                    <QueryCard
                        title="Customer Feedback"
                        description="Common patterns in customer feedback from the past year"
                        onUseQuery={setInput} // Pass setInput to update the input field
                    />
                    <QueryCard
                        title="Renewable Energy"
                        description="Summary of recent advancements in renewable energy technology"
                        onUseQuery={setInput}
                    />
                    <QueryCard
                        title="Blockchain Trends"
                        description="Latest news articles about emerging blockchain technology"
                        onUseQuery={setInput}
                    />
                </div>
            </div>

            <div className="query-results-container">
                {queries.map((queryItem, index) => (
                    <div key={index} className="query-result-card">
                        <p>
                            <strong>Query:</strong> {queryItem.query}
                        </p>
                        <p>
                            <strong>Response:</strong>{" "}
                            {Array.isArray(queryItem.response) ? (
                                <ul>
                                    {queryItem.response.map((res, i) => (
                                        <li key={i}>
                                            <strong>Link:</strong>{" "}
                                            <a
                                                href={res.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {res.link}
                                            </a>
                                            <br />
                                            <strong>Summary:</strong>{" "}
                                            {res.summary}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                queryItem.response
                            )}
                        </p>
                        <p>
                            <small>
                                <strong>Timestamp:</strong>{" "}
                                {queryItem.timestamp}
                            </small>
                        </p>
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
                    onKeyDown={(e) =>
                        e.key === "Enter" && handleSendQuery()
                    }
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
