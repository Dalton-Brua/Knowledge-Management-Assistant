import React from "react";
import { FiHome, FiFileText, FiSettings, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import "../styles/SideNav.css";

const SideNav = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear authentication tokens or session data
        localStorage.removeItem("authToken"); // Example: Clear token from storage
        sessionStorage.clear(); // Clear session storage if applicable

        // Redirect to the login page
        navigate("/login");
    };

    return (
        <div className="side-nav">
            {/* Logo Section */}
            <div className="logo-container">
                <img src={logo} alt="Company Logo" className="logo" />
            </div>

            {/* Navigation Links */}
            <div className="nav-list">
                <div className="nav-item" onClick={() => navigate("/dashboard")}>
                    <FiHome className="nav-icon" />
                    <span className="nav-text">Home</span>
                </div>
                <div className="nav-item" onClick={() => navigate("/saved-queries")}>
                    <FiFileText className="nav-icon" />
                    <span className="nav-text">Saved Queries</span>
                </div>
                <div className="nav-item" onClick={() => navigate("/admin")}>
                    <FiSettings className="nav-icon" />
                    <span className="nav-text">Settings</span>
                </div>
            </div>

            {/* Logout Button */}
            <div className="logout-container">
                <button className="logout-button" onClick={handleLogout}>
                    <FiLogOut className="logout-icon" />
                    <span className="logout-text">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default SideNav;
