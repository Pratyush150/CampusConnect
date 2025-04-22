// src/context/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import { isAuthenticated, getAuthToken, setAuthToken, removeAuthToken } from '../utils/auth';

const AuthContext = createContext();

// Provider component to wrap your app and provide global auth state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // This will hold the logged-in user's info

  useEffect(() => {
    // Check if the user is authenticated when the app first loads
    if (isAuthenticated()) {
      const token = getAuthToken();
      if (token) {
        setUser(token);  // You can enhance this by decoding token for user info
      }
    }
  }, []);

  // ✅ Login function - called after successful login
  const login = (token) => {
    setAuthToken(token);  // Store token in localStorage
    setUser(token);        // Update context state
  };

  // ✅ Logout function
  const logout = () => {
    removeAuthToken();  // Clear token from localStorage
    setUser(null);       // Clear context state
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children} {/* Makes auth context available to all children */}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context
export const useAuth = () => useContext(AuthContext);

