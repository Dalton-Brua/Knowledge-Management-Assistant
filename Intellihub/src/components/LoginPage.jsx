import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import "../styles/LoginPage.css";

const Login = ({ setIsAuthenticated }) => {

    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        // Simulate login by updating the authentication state
        console.log("Login: " + username);

        fetch('http://localhost:5000/getUserInfo/' + username, {
            method: 'GET', 
            //mode: 'no-cors'
        }).then(res => res.json()).then(data => {
            console.log(data);
            console.log("Aunthentication approved.")
            setIsAuthenticated(true);
            navigate("/dashboard"); // Remove after fixing Router issue in App.jsx?
        }).catch(error => {
            console.error("Error fetching data: ", error)
            setIsAuthenticated(false);
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
                            type="username"
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
