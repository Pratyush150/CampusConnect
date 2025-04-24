import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAuthToken, setAuthToken, removeAuthToken } from '../services/api'; // Util functions for handling tokens
import API from '../services/api'; // Import API service for fetching user data

const AuthContext = createContext();

// Provider component to wrap your app and provide global auth state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // This will hold the logged-in user's info
  const [loading, setLoading] = useState(true); // For loading state before auth check
  const [error, setError] = useState(null); // For handling errors during auth check

  useEffect(() => {
    const token = getAuthToken(); // Check if the user has a token
    if (token) {
      // If token exists, fetch user info using the token
      const fetchUser = async () => {
        try {
          const response = await API.get('/auth/me', {
            headers: { Authorization: `Bearer ${token}` }, // Pass token in the headers
          });
          setUser(response.data); // Set user data in state
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          setUser(null); // Clear user on error (e.g., invalid token)
          setError('Failed to authenticate. Please log in again.');
        }
      };
      fetchUser();
    } else {
      setUser(null); // No token, set user as null
      setError('No authentication token found.');
    }
    setLoading(false); // Update loading state once auth is checked
  }, []);

  // ✅ Login function - called after successful login
  const login = (token, userData) => {
    setAuthToken(token);  // Store token in localStorage (or cookies)
    setUser(userData);    // Update context state with user data
  };

  // ✅ Logout function
  const logout = () => {
    removeAuthToken();  // Clear token from localStorage (or cookies)
    setUser(null);       // Clear context state
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading, error }}>
      {loading ? (
        <div className="loading-spinner">
          {/* Add loading spinner component or message */}
          Loading...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context
export const useAuth = () => useContext(AuthContext);
