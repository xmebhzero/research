import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

type Props = { children: React.ReactNode[] };

const ProtectedRoute = ({ children }: Props) => {
  console.log(`🚀 ~ ProtectedRoute ~ children:`, children);
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const isUserLoggedIn = isLoggedIn();

  if (!isUserLoggedIn) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
