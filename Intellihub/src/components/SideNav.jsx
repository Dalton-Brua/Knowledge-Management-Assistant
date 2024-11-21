import React from "react";
import { FiHome, FiFileText, FiSettings, FiLogOut } from "react-icons/fi";
import logo from "../assets/Logo.png";
import "../styles/SideNav.css";

const SideNav = () => {
    return (
        <div className="side-nav">
            {/* Logo Section */}
            <div className="logo-container">
                <img src={logo} alt="Company Logo" className="logo" />
            </div>

            {/* Navigation Links */}
            <div className="nav-list">
                <div className="nav-item">
                    <FiHome className="nav-icon" />
                    <span className="nav-text">Home</span>
                </div>
                <div className="nav-item">
                    <FiFileText className="nav-icon" />
                    <span className="nav-text">Saved Queries</span>
                </div>
                <div className="nav-item">
                    <FiSettings className="nav-icon" />
                    <span className="nav-text">Settings</span>
                </div>
            </div>

            {/* Logout Button */}
            <div className="logout-container">
                <button className="logout-button">
                    <FiLogOut className="logout-icon" />
                    <span className="logout-text">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default SideNav;
