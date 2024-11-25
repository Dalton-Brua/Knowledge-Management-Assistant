import React from "react";
import { FiEdit, FiTrash2, FiUserX } from "react-icons/fi"; // Using icons for actions
import "../styles/UsersTable.css";

const UsersTable = () => {
    const users = [
        { name: "Dwight Shrute", role: "Admin" },
        { name: "Ashley Olson", role: "Knowledge Manager" },
        { name: "Albus Dumbledore", role: "Knowledge Manager" },
        { name: "Will Ferrell", role: "Guest" },
        { name: "Homer Simpson", role: "Knowledge Manager" },
        { name: "Delores O’Riordan", role: "Admin" },
        { name: "Melanie Chisholm", role: "Knowledge Manager" },
    ];

    return (
        <div className="users-table">
            <div className="table-header">
                <div className="column-header">Users</div>
                <div className="column-header">Role</div>
                <div className="column-header">Actions</div>
            </div>
            {users.map((user, index) => (
                <div key={index} className="table-row">
                    <div className="user-name">{user.name}</div>
                    <div className="user-role">{user.role}</div>
                    <div className="actions">
                        <button className="action-button edit">
                            <FiEdit /> Edit
                        </button>
                        <button className="action-button deactivate">
                            <FiUserX /> Deactivate
                        </button>
                        <button className="action-button delete">
                            <FiTrash2 /> Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UsersTable;