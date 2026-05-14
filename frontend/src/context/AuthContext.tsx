import { createContext, useState, type ReactNode, useEffect } from "react";
import { authService } from "@/services/auth.service.ts";
import { setLogoutCallback } from "@/lib/api";
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

  useEffect(() => {
    setLogoutCallback(() => {
      setUser(null);
      localStorage.removeItem("auth_user");
    });
  }, []);

  async function login(credentials: { email: string; password: string }) {
    try {
      const data = await authService.login(credentials);
      localStorage.setItem("auth_user", JSON.stringify(data));
      setUser(data);
      return data;
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
      return data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Signup failed. Please try again.";
      toast.error(message);
      throw error;
    }
  }

  function updateStoredUser(updates: Partial<AuthUser>) {
    setUser((currentUser) => {
      if (!currentUser) {
        return currentUser;
      }

      const updatedUser = {
        ...currentUser,
        ...updates,
        token: currentUser.token,
      };

      localStorage.setItem("auth_user", JSON.stringify(updatedUser));
      return updatedUser;
    });
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
        updateStoredUser,
        isAuthenticated: !!user,
        userType: user?.userType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
