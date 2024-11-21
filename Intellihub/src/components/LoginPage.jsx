import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

const Login = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogin = () => {
        // Simulate login by updating the authentication state
        setIsAuthenticated(true);
        navigate("/dashboard");
    };

    return (
        <div className="login-page">
            <div className="login-container">
                {/* Logo Section */}
                <img
                    src={require("../assets/Logo.png")} // Ensure the logo path is correct
                    alt="Logo"
                    className="logo"
                />

                {/* Login Title */}
                <h1 className="login-title">Sign In</h1>

                {/* Login Form */}
                <form
                    className="login-form"
                    onSubmit={(e) => {
                        e.preventDefault(); // Prevent page reload on form submission
                        handleLogin();
                    }}
                >
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            required
                            className="login-input"
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            className="login-input"
                        />
                    </div>
                    <p className="reset-password">Reset password</p>
                    <button type="submit" className="login-button">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
