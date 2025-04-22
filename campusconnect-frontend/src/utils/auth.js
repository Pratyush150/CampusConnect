// src/utils/auth.js

import { jwtDecode } from 'jwt-decode';  // For decoding JWT tokens

// Store token in localStorage
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', JSON.stringify(token));
  } else {
    localStorage.removeItem('authToken');
  }
};

// Get token from localStorage
export const getAuthToken = () => {
  const token = localStorage.getItem('authToken');
  return token ? JSON.parse(token) : null;
};

// Check if token is valid and not expired
export const isAuthenticated = () => {
  const token = getAuthToken();
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);  // Decode the token

    // Check if token has expired (exp is in seconds, Date.now is in ms)
    if (decodedToken && decodedToken.exp > Date.now() / 1000) {
      return true;
    } else {
      removeAuthToken();  // Expired token should be removed
      return false;
    }
  } catch (error) {
    removeAuthToken();  // Corrupted token should be removed
    return false;
  }
};

// Remove token from localStorage
export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};


