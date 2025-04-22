import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components and Context
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import { isAuthenticated, getAuthToken } from './utils/auth'; // Ensure getAuthToken is exported

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import CollegeDashboard from './pages/CollegeDashboard';
import CollegeProfile from './pages/CollegeProfile';

// Step 6: Protecting Routes (PrivateRoute Component)
const AppWithAuthCheck = () => {
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getAuthToken());
    } else {
      setUser(null);
    }
  }, [setUser]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* Redirect to dashboard if logged in, else login page */}
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <CollegeDashboard />
            </PrivateRoute>
          }
        />
        
        {/* Another protected route */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <CollegeProfile />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppWithAuthCheck />
      </Router>
    </AuthProvider>
  );
}

export default App;







