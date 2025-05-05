import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAuthToken, setAuthToken, removeAuthToken } from '../services/api'; // Util functions for handling tokens
import API from '../services/api'; // Import API service for fetching user data

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
          const response = await API.get('/users/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          setUser(null);
          setError('Failed to authenticate. Please log in again.');
        }
      };
      fetchUser();
    } else {
      setUser(null);
      setError('No authentication token found.');
    }
    setLoading(false);
  }, []);

  const login = (token, userData) => {
    setAuthToken(token);
    setUser(userData);
    setError(null);  // Clear any existing error
  };

  const logout = () => {
    removeAuthToken();
    setUser(null);
    setError(null);  // Clear error on logout
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading, error }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

