import React, { useState, useEffect } from "react";
import UsersTable from "./UsersTable";
import "../styles/AdminPanel.css";

const AdminPanel = () => {
    let isAdmin = false;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState("");
    const [oldUsername, setOldUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Admin");
    const [editUserId, setEditUserId] = useState(null);
    
    if (sessionStorage.getItem('role') === "Admin") {
        isAdmin = true;
    }

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setUsername("");
        setPassword("");
        setRole("Admin");
        setEditUserId(null);
    };

    const handleAddOrEditUser = (event) => {
        event.preventDefault();

        if (!username.trim() || !password.trim()) return;

        if (editUserId) {
            fetch('http://localhost:5000/editUser', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    oldUser: oldUsername,
                    newUser: {
                        name: username,
                        pass: password,
                        role: role
                    }
                })
            }).then(res => res.json()).then(data => {
                setUsers(data);
            });
        } else {
            fetch('http://localhost:5000/createUser', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: username,
                    pass: password,
                    role: role
                })
            }).then(res => res.json()).then(data => {
                setUsers(data);
            });
        }

        closeModal();
    };

    const handleEditUser = (user) => {
        fetch('http://localhost:5000/getUserInfo', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: user.name, }),
        }).then(res => res.json()).then(data => {

            setUsername(data.name);
            setOldUsername(data.name);
            setPassword(data.pass);
            setRole(data.role);

        });
        setEditUserId(true);
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
                    isAdmin={isAdmin}
                />

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