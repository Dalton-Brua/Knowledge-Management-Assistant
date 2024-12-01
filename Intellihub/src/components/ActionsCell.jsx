import React from "react";
import "../styles/ActionsCell.css";

const ActionsCell = ({ onEdit, onDelete }) => {
    return (
        <div className="actions-cell">
            <button className="edit-button" onClick={onEdit}>
                Edit
            </button>
            <button className="delete-button" onClick={onDelete}>
                Delete
            </button>
        </div>
    );
};

export default ActionsCell;
