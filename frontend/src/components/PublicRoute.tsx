import { Navigate } from "react-router-dom";
import type { ReactElement } from "react";
import useAuth from "@/hooks/useAuth";

const PublicRoute = ({ element }: { element: ReactElement }) => {
  const { isAuthenticated, userType } = useAuth();

  if (isAuthenticated) {
    return (
      <Navigate
        to={userType === "Consumer" ? "/" : "/admin/dashboard"}
        replace
      />
    );
  }

  return element;
};

export default PublicRoute;
