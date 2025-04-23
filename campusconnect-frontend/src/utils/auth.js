import { jwtDecode } from 'jwt-decode';  // For decoding JWT tokens
import API from '../services/api';  // For calling your API to refresh the token

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
export const isAuthenticated = async () => {
  const token = getAuthToken();
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);  // Decode the token

    // Check if token has expired (exp is in seconds, Date.now is in ms)
    if (decodedToken && decodedToken.exp > Date.now() / 1000) {
      return true;
    } else {
      // If token is expired, attempt to refresh it
      const refreshed = await refreshAccessToken();
      return refreshed;
    }
  } catch (error) {
    removeAuthToken();  // Corrupted token should be removed
    return false;
  }
};

// Refresh access token using refresh token
const refreshAccessToken = async () => {
  try {
    const response = await API.post('/auth/refresh-token');  // Adjust API endpoint if needed
    const { token } = response.data;

    if (token) {
      setAuthToken(token);  // Store new access token
      return true;
    }

    removeAuthToken();
    return false;
  } catch (error) {
    console.error('Error refreshing token:', error);
    removeAuthToken();
    return false;
  }
};

// Remove token from localStorage
export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

