import { Navigate } from "react-router-dom";
import type { ReactElement } from "react";
import useAuth from "@/hooks/useAuth";

const ProtectedRoute = ({
  type,
  element,
}: {
  type: string;
  element: ReactElement;
}) => {
  const { isAuthenticated, userType, isTokenExpired } = useAuth();

  // Redirect to login if not authenticated
  if (!isAuthenticated || userType() !== type || isTokenExpired()) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
