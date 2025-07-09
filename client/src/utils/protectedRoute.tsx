import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "./auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = getCurrentUser();
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
