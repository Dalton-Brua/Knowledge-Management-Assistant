import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/LoginPage";
import QueryDashboard from "./components/QueryDashboard";
import AdminPanel from "./components/AdminPanel";
import SavedQueries from "./components/SavedQueries";
import Layout from "./components/Layout";

const App = () => {
    const isAuthenticated = true; // Temporarily set to true to bypass login

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
                />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/dashboard"
                    element={
                        isAuthenticated ? (
                            <Layout>
                                <QueryDashboard />
                            </Layout>
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/saved-queries"
                    element={
                        isAuthenticated ? (
                            <Layout>
                                <SavedQueries />
                            </Layout>
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/admin"
                    element={
                        isAuthenticated ? (
                            <Layout>
                                <AdminPanel />
                            </Layout>
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
