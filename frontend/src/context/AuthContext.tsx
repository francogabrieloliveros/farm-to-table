import { createContext, useState, type ReactNode } from "react";
import { authService } from "@/services/auth.service.ts";
import {
  type AuthUser,
  type AuthContextValue,
} from "@/types/AuthenticationTypes";
import toast from "react-hot-toast";

const AuthContext = createContext<AuthContextValue | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem("auth_user");
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Failed to parse stored user:", error);
      return null;
    }
  });

  async function login(credentials: { email: string; password: string }) {
    try {
      const data = await authService.login(credentials);
      localStorage.setItem("auth_user", JSON.stringify(data));
      setUser(data);
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed. Please check your credentials.";
      toast.error(message);
      throw error;
    }
  }

  async function signup(credentials: {
    fname: string;
    mname: string | null;
    lname: string;
    email: string;
    password: string;
  }) {
    try {
      const data = await authService.signup(credentials);
      localStorage.setItem("auth_user", JSON.stringify(data));
      setUser(data);
    } catch (error: any) {
      const message = error.response?.data?.message || "Signup failed. Please try again.";
      toast.error(message);
      throw error;
    }
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
