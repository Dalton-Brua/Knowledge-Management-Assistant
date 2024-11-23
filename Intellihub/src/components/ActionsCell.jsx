import React from "react";
import "../styles/ActionsCell.css"; 

const ActionsCell = ({ onEdit, onDeactivate, onDelete }) => {
    return (
        <div className="actions-cell">
            <button className="edit-button" onClick={onEdit}>
                Edit
            </button>
            <button className="deactivate-button" onClick={onDeactivate}>
                Deactivate
            </button>
            <button className="delete-button" onClick={onDelete}>
                Delete
            </button>
        </div>
    );
};

export default ActionsCell;
