import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAuthToken, setAuthToken, removeAuthToken } from '../services/api'; // Util functions for handling tokens

const AuthContext = createContext();

// Provider component to wrap your app and provide global auth state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // This will hold the logged-in user's info
  const [loading, setLoading] = useState(true); // For loading state before auth check

  useEffect(() => {
    // Check if the user is authenticated when the app first loads
    const token = getAuthToken();
    if (token) {
      // Fetch user info (you can use the token to fetch the user from your backend)
      setUser({ token });
    }
    setLoading(false); // Update loading state
  }, []);

  // ✅ Login function - called after successful login
  const login = (token) => {
    setAuthToken(token);  // Store token in localStorage (or cookies)
    setUser({ token });    // Update context state with user data
  };

  // ✅ Logout function
  const logout = () => {
    removeAuthToken();  // Clear token from localStorage (or cookies)
    setUser(null);       // Clear context state
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children} {/* Makes auth context available to all children */}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context
export const useAuth = () => useContext(AuthContext);


