import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Helper function to check if the user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decoding JWT token
    if (decodedToken.exp < Date.now() / 1000) {
      localStorage.removeItem("token"); // Clear expired token
      return false;
    }
    return true;
  } catch (err) {
    return false; // If token is invalid
  }
};

const PrivateRoute = ({ element: Element, ...rest }) => {
  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      element={isAuthenticated() ? <Element /> : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
