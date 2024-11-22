import React from "react";
import SideNav from "./SideNav";
import "../styles/Layout.css"; // Add any layout-specific styles here

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <SideNav />
            <div className="main-content">{children}</div>
        </div>
    );
};

export default Layout;
