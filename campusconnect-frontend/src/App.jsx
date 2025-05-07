import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { jwtDecode } from "jwt-decode";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { isAuthenticated } from "./utils/auth";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOTP from "./pages/VerifyOTP";
import CollegeDashboard from "./pages/CollegeDashboard";
import Profile from "./pages/Profile";
import StudentDashboard from "./pages/StudentDashboard";
import MentorDashboard from "./pages/MentorDashboard";
import LoadingSpinner from "./components/LoadingSpinner";

const AppRoutes = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (await isAuthenticated()) {
          const token = localStorage.getItem("token");
          const decoded = jwtDecode(token);
          setUser({ ...decoded, token });
        }
      } catch (error) {
        localStorage.removeItem("token");
        console.error("Authentication check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setUser]);

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
        
        {/* Public routes */}
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <Signup />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route 
            path="/dashboard" 
            element={
              user?.role === "MENTOR" ? 
              <MentorDashboard /> : 
              <StudentDashboard />
            } 
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/college" element={<CollegeDashboard />} />
        </Route>

        {/* Fallback routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <AppRoutes />
    </Router>
  </AuthProvider>
);

export default App;








