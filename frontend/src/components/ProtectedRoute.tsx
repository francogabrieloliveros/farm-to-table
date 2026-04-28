import { Navigate } from "react-router";
import useAuth from "@/hooks/useAuth";
import { type ProtectedRouteProps } from "@/types/ProtectedRouteProps";

const ProtectedRoute = ({
  redirectTo = "/login",
  element,
  type,
}: ProtectedRouteProps) => {
  const { isAuthenticated, userType } = useAuth();

  // Redirect to login if not authenticated
  if (!isAuthenticated || userType !== type) {
    return <Navigate to={redirectTo} replace />;
  }

  // Return desired component if authenticated
  return element;
};

export default ProtectedRoute;
