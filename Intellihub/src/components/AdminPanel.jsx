import React from "react";
import SideNav from "./SideNav";
import UsersTable from "./UsersTable";
import CardContainer from "./CardContainer";
import "../styles/AdminPanel.css";

const AdminPanel = () => {
    return (
        <div className="admin-panel">
            
            <div className="content">
                <h1 className="admin-header">Admin Settings</h1>
                <UsersTable />
                <CardContainer />
            </div>
        </div>
    );
};

export default AdminPanel;