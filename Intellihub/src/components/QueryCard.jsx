import React, { useState } from "react";
import "../styles/QueryCard.css";

const QueryCard = ({ title, description, onUseQuery }) => {
    const [hover, setHover] = useState(false);

    return (
        <div
            className={`query-card ${hover ? "hover" : ""}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <h3 className="query-card-title">{title}</h3>
            <p className="query-card-description">{description}</p>
            <div className="query-card-actions">
                <button
                    className="use-query-button"
                    onClick={() => onUseQuery(description)} // Pass description to the parent
                >
                    Use Query
                </button>
            </div>
        </div>
    );
};

export default QueryCard;
