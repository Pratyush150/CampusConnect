// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom'; // Use Navigate for redirection in v6
import { isAuthenticated } from '../utils/auth'; // Authentication helper

const PrivateRoute = ({ children }) => {
  // If the user is authenticated, render the children (protected components)
  // Otherwise, redirect to the login page
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
