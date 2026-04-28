import { createContext, useState, type ReactNode } from "react";
import {
  type AuthUser,
  type AuthContextValue,
} from "@/types/AuthenticationTypes";
import { authService } from "@/services/auth.service.ts";

const AuthContext = createContext<AuthContextValue | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem("auth_user");
    return stored ? JSON.parse(stored) : null;
  });

  async function login(credentials: { email: string; password: string }) {
    const data = await authService.login(credentials);
    localStorage.setItem("auth_user", JSON.stringify(data));
    setUser(data);
  }

  async function signup(credentials: {
    fname: string;
    mname: string | null;
    lname: string;
    email: string;
    password: string;
  }) {
    const data = await authService.signup(credentials);
    localStorage.setItem("auth_user", JSON.stringify(data));
    setUser(data);
  }

  function logout() {
    localStorage.removeItem("auth_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        userType: user?.userType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
