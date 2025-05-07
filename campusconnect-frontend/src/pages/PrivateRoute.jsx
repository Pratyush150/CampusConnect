import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Helper function to check if the user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    if (decodedToken.exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};

/**
 * Usage in your routes:
 * <Route element={<PrivateRoute />}>
 *   <Route path="/profile" element={<Profile />} />
 *   ...other protected routes...
 * </Route>
 */
const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
