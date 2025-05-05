// In src/utils/auth.js
import jwtDecode from "jwt-decode";

import API from '../services/api';  // API service to refresh the token

// Store token in localStorage
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', JSON.stringify(token));  // Store token as string
  } else {
    localStorage.removeItem('authToken');  // Remove token if it's null or invalid
  }
};

// Get token from localStorage
export const getAuthToken = () => {
  const token = localStorage.getItem('authToken');
  return token ? JSON.parse(token) : null;  // Parse token as JSON if exists, otherwise null
};

// Check if token is valid and not expired
export const isAuthenticated = async () => {
  const token = getAuthToken();
  if (!token) return false;  // If no token, user is not authenticated

  try {
    const decodedToken = jwtDecode(token);  // Decode the token to get expiration data

    // Check if token has expired (exp is in seconds, Date.now is in ms)
    if (decodedToken && decodedToken.exp > Date.now() / 1000) {
      return true;  // Token is valid and not expired
    } else {
      // If token is expired, attempt to refresh it
      const refreshed = await refreshAccessToken();
      return refreshed;  // Return result of refresh attempt
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    removeAuthToken();  // If decoding fails (corrupted token), remove it
    return false;  // Return false as user is not authenticated
  }
};

// Refresh access token using refresh token
const refreshAccessToken = async () => {
  try {
    const refreshToken = getRefreshToken();  // Get the refresh token from cookies or localStorage
    if (!refreshToken) return false;  // If no refresh token, fail the refresh

    const response = await API.post('/auth/refresh-token', { refreshToken });  // Adjust API endpoint if needed
    const { token } = response.data;

    if (token) {
      setAuthToken(token);  // Store the new access token
      return true;  // Return true to indicate success
    }

    removeAuthToken();  // If no new token, remove the old one
    return false;  // Return false as refresh attempt failed
  } catch (error) {
    console.error('Error refreshing token:', error);
    removeAuthToken();  // Remove the token if refresh fails
    return false;  // Return false as refresh attempt failed
  }
};

// Get refresh token from cookies or localStorage (for use in refreshing access token)
const getRefreshToken = () => {
  const name = 'refreshToken=';
  const decodedCookie = decodeURIComponent(document.cookie);  // Decode the cookies
  const cookies = decodedCookie.split(';');

  // Loop through cookies to find refreshToken
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i].trim();  // Ensure no leading spaces
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);  // Return the refresh token value
    }
  }
  return '';  // Return an empty string if no refresh token found
};

// Remove token from localStorage
export const removeAuthToken = () => {
  localStorage.removeItem('authToken');  // Remove access token from localStorage
};
