// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import { isAuthenticated, getAuthToken } from './utils/auth';

import Login from './pages/Login';
import Signup from './pages/Signup';
import CollegeDashboard from './pages/CollegeDashboard';
import CollegeProfile from './pages/CollegeProfile';

const AppWithAuthCheck = () => {
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getAuthToken());  // Set authenticated user info from token
    } else {
      setUser(null);  // Clear user info if not authenticated
    }
  }, [setUser]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* Redirect based on authentication state */}
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Protected routes with PrivateRoute wrapper */}
        <Route path="/dashboard" element={<PrivateRoute><CollegeDashboard /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><CollegeProfile /></PrivateRoute>} />
      </Routes>
    </div>
  );
};

// Main App component wrapped with AuthProvider to provide authentication context
const App = () => (
  <AuthProvider>
    <Router>
      <AppWithAuthCheck />
    </Router>
  </AuthProvider>
);

export default App;








