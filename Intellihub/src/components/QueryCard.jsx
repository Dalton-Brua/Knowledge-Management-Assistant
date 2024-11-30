import React from "react";
import "../styles/QueryCard.css";

const QueryCard = ({ title, description }) => {
  return (
      <div className="query-card">
          <h3 className="query-card-title">{title}</h3>
          <p className="query-card-description">{description}</p>
      </div>
  );
};

export default QueryCard;
