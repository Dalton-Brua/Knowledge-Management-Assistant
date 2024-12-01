import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

const Login = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {

        fetch('http://localhost:5000/getUserInfo', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: username, }),
        }).then(res => res.json()).then(data => {
            
            if (data.pass !== password) {
                throw new Error("Incorrect password");
            }
            console.log(data);
            setIsAuthenticated(true);
            sessionStorage.setItem('role', data.role);
            sessionStorage.setItem('name', data.name);
            navigate("/dashboard");
        }).catch(error => {
            console.error("Error fetching data: ", error);
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
                    <form // Login Form
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
                        >
                            Reset password
                        </p>
                        <button type="submit" className="login-button">
                            Submit
                        </button>
                    </form>
            </div>
        </div>
    );
};

export default Login;
