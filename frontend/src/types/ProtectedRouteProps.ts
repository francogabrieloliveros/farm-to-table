import { type ReactElement } from "react";

type ProtectedRouteProps = {
  redirectTo?: string;
  element: ReactElement;
  type: string;
};

export { type ProtectedRouteProps };
