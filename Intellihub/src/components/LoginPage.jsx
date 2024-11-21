import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        // Placeholder for backend login logic
        navigate("/dashboard");
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <img 
                    src="../assets/Logo.png" // Replace with your actual logo path
                    alt="Logo" 
                    className="logo"
                />
                <h1 className="login-title">Sign In</h1>
                <form className="login-form">
                    <div className="input-group">
                        <input type="email" placeholder="Email Address" required />
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder="Password" required />
                    </div>
                    <p className="reset-password">Reset password</p>
                    <button type="button" className="login-button" onClick={handleLogin}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
