import React, { useState, useEffect } from "react";
import ActionsCell from "./ActionsCell";
import EditUser from "./EditUser";
import DeactivateUser from "./DeactivateUser";
import DeleteUser from "./DeleteUser";
import "./AdminPanel.css";

const AdminPanel = () => {
    // State to store user data fetched from an API
    const [users, setUsers] = useState([]);

    // Fetch users from a simulated API on component mount
    useEffect(() => {
        fetch('/api/users') // Replace this with your actual API endpoint
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error("Failed to fetch users:", err));
    }, []);

    // Function to handle password reset
    const handlePasswordReset = (userId) => {
        fetch(`/api/reset-password/${userId}`, { method: "POST" }) // Simulated API call
            .then((res) => res.json())
            .then(() => alert(`Password reset for user ID: ${userId}`))
            .catch((err) => console.error("Failed to reset password:", err));
    };

    // Function to handle user deletion
    const handleUserDeletion = (userId) => {
        fetch(`/api/users/${userId}`, { method: "DELETE" }) // Simulated API call
            .then((res) => res.json())
            .then(() => {
                setUsers(users.filter((user) => user.id !== userId));
                alert(`User ID ${userId} deleted successfully.`);
            })
            .catch((err) => console.error("Failed to delete user:", err));
    };

    return (
        <div className="admin-panel">
            <header className="admin-header">
                <h1>Admin Settings</h1>
            </header>

            <div className="users-table">
                <div className="table-header">
                    <span>Users</span>
                    <span>Role</span>
                    <span>Actions</span>
                </div>

                {users.length > 0 ? (
                    users.map((user) => (
                        <div className="user-row" key={user.id}>
                            <span>{user.name}</span>
                            <span>{user.role}</span>
                            <div className="actions">
                                <ActionsCell
                                    onEdit={() => alert(`Edit user: ${user.name}`)} // Replace with real edit logic
                                    onDeactivate={() => handlePasswordReset(user.id)}
                                    onDelete={() => handleUserDeletion(user.id)}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading users...</p>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
