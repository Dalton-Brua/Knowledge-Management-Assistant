import React, { useState, useEffect } from "react";
import UsersTable from "./UsersTable";
import CardContainer from "./CardContainer";
import "../styles/AdminPanel.css";

const AdminPanel = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Admin");
    const [isActive, setIsActive] = useState(true);
    const [editUserId, setEditUserId] = useState(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setUsername("");
        setEmail("");
        setPassword("");
        setRole("Admin");
        setIsActive(true);
        setEditUserId(null);
    };

    const handleAddOrEditUser = (event) => {
        event.preventDefault();

        if (!username.trim() || !email.trim() || !password.trim()) return;

        if (editUserId) {
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === editUserId
                        ? { ...user, name: username, email, password, role, status: isActive ? "Active" : "Inactive" }
                        : user
                )
            );
        } else {
            const newUser = {
                id: Date.now(),
                name: username,
                email,
                password,
                role,
                status: isActive ? "Active" : "Inactive",
            };
            setUsers((prevUsers) => [...prevUsers, newUser]);
        }

        closeModal();
    };

    const handleEditUser = (user) => {
        setEditUserId(user.id);
        setUsername(user.name);
        setEmail(user.email);
        setPassword(user.password); // Pre-fill password for editing
        setRole(user.role);
        setIsActive(user.status === "Active");
        openModal();
    };

    const handleDeleteUser = (userDelete) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userDelete.id));
        console.log(userDelete.name)
        fetch('http://localhost:5000/deleteUser', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: userDelete.name })
            
        }).then(res => res.json()).then(data => {
            setUsers(data);
        })
    };

    useEffect(() => {
        fetch('http://localhost:5000/getUsers').then(res => res.json()).then(data => {
            setUsers(data);
        })
    }, []);

    return (
        <div className="admin-panel">
            <div className="content">
                <h1 className="admin-header">Administrator Settings</h1>
                <button className="add-user-btn" onClick={openModal}>
                    + Add User
                </button>
                <UsersTable
                    users={users}
                    onEditUser={handleEditUser}
                    onDeleteUser={handleDeleteUser}
                />
                <CardContainer />

                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h2>{editUserId ? "Edit User" : "Add New User"}</h2>
                            <form onSubmit={handleAddOrEditUser}>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="role">Role</label>
                                    <select
                                        id="role"
                                        name="role"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        required
                                    >
                                        <option value="Admin">Admin</option>
                                        <option value="Knowledge Manager">Knowledge Manager</option>
                                        <option value="Guest">Guest</option>
                                    </select>
                                </div>
                                <div className="form-group checkbox-group">
                                    <input
                                        type="checkbox"
                                        id="active"
                                        name="active"
                                        checked={isActive}
                                        onChange={(e) => setIsActive(e.target.checked)}
                                    />
                                    <label htmlFor="active">Active?</label>
                                </div>
                                <div className="form-actions">
                                    <button type="submit" className="submit-btn">
                                        {editUserId ? "Save Changes" : "Add User"}
                                    </button>
                                    <button
                                        type="button"
                                        className="cancel-btn"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
