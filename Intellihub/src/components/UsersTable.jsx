import React from "react";
import ActionsCell from "./ActionsCell";
import "../styles/UsersTable.css";

const UsersTable = ({ users, onEditUser, onDeleteUser }) => {
    return (
        <div className="users-table-container">
            <table className="users-table">
                <thead>
                    <tr>
                        <th className="username-column">Username</th>
                        <th className="role-column">Role</th>
                        <th className="actions-column">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="username-column">{user.name}</td>
                            <td className="role-column">{user.role}</td>
                            <td className="actions-column">
                                <ActionsCell
                                    onEdit={() => onEditUser(user)}
                                    onDelete={() => onDeleteUser(user)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
