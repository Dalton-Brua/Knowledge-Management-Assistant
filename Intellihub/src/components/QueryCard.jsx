import React from "react";
import "../styles/QueryCard.css";
// Hover
const QueryCard = ({ title, description, onUseQuery }) => {
  return (
    <div className="query-card" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <h3 className="query-card-title">{title}</h3>
      <p className="query-card-description">{description}</p>
      <div className="query-card-actions">
        <button className="use-query-button" onClick={onUseQuery}>Use Query</button>
      </div>
    </div>
  );
};

export default QueryCard;
