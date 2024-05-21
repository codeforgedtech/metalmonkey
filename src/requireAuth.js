
import React from 'react';
import { Navigate } from 'react-router-dom';

const requireAuth = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return null; // Returnera ingenting om användaren är inloggad och tillåt åtkomst
};

export default requireAuth;