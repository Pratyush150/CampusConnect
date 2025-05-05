import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import API from "./services/api";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { isAuthenticated, getAuthToken } from "./utils/auth";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOTP from "./pages/VerifyOTP";  // OTP verification page

import CollegeDashboard from "./pages/CollegeDashboard";
import CollegeProfile from "./pages/CollegeProfile";

const AppWithAuthCheck = () => {
  const { user, setUser } = useAuth();

  // Check authentication state when the app loads
  useEffect(() => {

    const checkAuth = async () => {
      try {
        const res = await API.get("/users/me"); // securely fetch user info
        setUser(res.data.user); // store full user object
      } catch (err) {
        console.error("Auth check failed:", err);
        setUser(null);
      }
    };
    
    checkAuth();
  }, [setUser]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOTP />} /> {/* OTP page */}
        {/* Protected routes */}
        <Route path="/dashboard" element={<PrivateRoute><CollegeDashboard /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><CollegeProfile /></PrivateRoute>} />
      </Routes>
    </div>
  );
};

// Main App component wrapped with AuthProvider for global authentication state
const App = () => (
  <AuthProvider>
    <Router>
      <AppWithAuthCheck />
    </Router>
  </AuthProvider>
);

export default App;







