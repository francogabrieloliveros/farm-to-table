import { Navigate } from "react-router";
import type { ReactElement } from "react";
import useAuth from "@/hooks/useAuth";

const ProtectedRoute = ({
  type,
  element,
}: {
  type: string;
  element: ReactElement;
}) => {
  const { isAuthenticated, userType } = useAuth();

  // Redirect to login if not authenticated
  if (!isAuthenticated || userType !== type) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
