import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

const Login = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showResetForm, setShowResetForm] = useState(false); // Toggle between login and reset forms
    const [email, setEmail] = useState(""); // For reset password form
    const navigate = useNavigate();

    const handleLogin = () => {
        console.log("Login: " + username);

        fetch('http://localhost:5000/getUserInfo/' + username, {
            method: 'GET',
        }).then(res => res.json()).then(data => {
            // TODO: IMPLEMENT PASSWORD HASHING AND CHECKING
            if (data.pass !== password) {
                throw new Error("Incorrect password");
            }
            console.log(data);
            console.log("Authentication approved.");
            setIsAuthenticated(true);
            navigate("/dashboard");
        }).catch(error => {
            console.error("Error fetching data: ", error);
            setIsAuthenticated(false);
        });
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        console.log("Resetting password for: " + email);

        // TODO: Add backend integration for password reset
        fetch('http://localhost:5000/resetPassword', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert("Password reset link sent to your email.");
                    setShowResetForm(false); // Return to login form
                } else {
                    alert("Failed to send reset link. Please try again.");
                }
            })
            .catch(error => {
                console.error("Error resetting password: ", error);
            });
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
                <h1 className="login-title">
                    {showResetForm ? "Reset Password" : "Sign In"}
                </h1>

                {showResetForm ? (
                    // Reset Password Form
                    <form
                        className="reset-form"
                        onSubmit={handleResetPassword}
                    >
                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                required
                                className="login-input"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="login-button">
                            Reset Password
                        </button>
                        <p
                            className="reset-password back-to-login"
                            onClick={() => setShowResetForm(false)}
                        >
                            Back to Sign In
                        </p>
                    </form>
                ) : (
                    // Login Form
                    <form
                        className="login-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleLogin();
                        }}
                    >
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Username"
                                required
                                className="login-input"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                className="login-input"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <p
                            className="reset-password"
                            onClick={() => setShowResetForm(true)}
                        >
                            Reset password
                        </p>
                        <button type="submit" className="login-button">
                            Submit
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;
