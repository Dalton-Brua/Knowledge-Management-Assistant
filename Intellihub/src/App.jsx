import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/LoginPage";
import QueryDashboard from "./components/QueryDashboard";
import AdminPanel from "./components/AdminPanel";
import SavedQueries from "./components/SavedQueries";
import Layout from "./components/Layout";

const App = () => {
    // Replace this with actual authentication logic
    const isAuthenticated = false; // Temporarily set to false for testing login

    return (
        <Router>
            <Routes>
                {/* Default route: Redirect to login or dashboard based on authentication */}
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <Navigate to="/dashboard" replace />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />

                {/* Login Route */}
                <Route path="/login" element={<Login />} />

                {/* Protected Routes */}
                <Route
                    path="/dashboard"
                    element={
                        isAuthenticated ? (
                            <Layout>
                                <QueryDashboard />
                            </Layout>
                        ) : (
                            <Navigate to="/login" replace />
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
                            <Navigate to="/login" replace />
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
                            <Navigate to="/login" replace />
                        )
                    }
                />

                {/* Fallback for undefined routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
