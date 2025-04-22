import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isLoggedIn = localStorage.getItem('token'); // Check for JWT token

  return (
    <Route
      {...rest}
      element={isLoggedIn ? <Element /> : <Navigate to="/login" replace />} // Redirect to login if not logged in
    />
  );
};

export default PrivateRoute;
