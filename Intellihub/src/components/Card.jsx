import React from "react";
import "../styles/Card.css";

const Card = ({ title, inUse, available, manageText }) => {
    return (
        <div className="card">
            <div className="card-title">{title}</div>
            {inUse && available ? (
                <div className="card-info">
                    <span className="card-label">In use:</span>
                    <span className="card-value">{inUse}</span>
                    <span className="card-label">Available:</span>
                    <span className="card-value">{available}</span>
                </div>
            ) : (
                <div className="card-manage">{manageText || "Manage"}</div>
            )}
        </div>
    );
};

export default Card;