import React, { createContext, useState, useContext, useEffect } from 'react';
import API from '../services/api'; // Unified API instance
import { getAuthToken, setAuthToken, removeAuthToken } from '../services/api';
// In src/context/AuthContext.jsx
import { getAuthToken } from "../services/api";  // Make sure this matches the export

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await API.get('/users/me');
          setUser(response.data);
        } catch (err) {
          console.error('Failed to fetch user:', err);
          setUser(null);
          setError('Session expired. Please log in again.');
          removeAuthToken(); // Cleanup on failure
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    } else {
      setUser(null);
      setLoading(false);
    }
  }, []);

  const login = (token, userData) => {
    setAuthToken(token);
    setUser(userData);
    setError(null);
  };

  const logout = () => {
    removeAuthToken();
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading, error }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
