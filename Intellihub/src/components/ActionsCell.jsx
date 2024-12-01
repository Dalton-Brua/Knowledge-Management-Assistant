import React from "react";
import "../styles/ActionsCell.css";

const ActionsCell = ({ onEdit, onDelete, isAdmin }) => {
    return (
        <div className="actions-cell">
            <button className="edit-button" onClick={onEdit}>
                Edit
            </button>
            { isAdmin && (
            <button className="delete-button" onClick={onDelete}>
                Delete
            </button>
            )}
        </div>
    );
};

export default ActionsCell;
