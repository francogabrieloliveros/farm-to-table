import { createContext, useState, type ReactNode, useEffect } from "react";
import { authService } from "@/services/auth.service.ts";
import { setLogoutCallback } from "@/lib/api";
import { jwtDecode } from "jwt-decode";
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
      if (!stored) return null;

      const parsed = JSON.parse(stored);

      const decoded: any = jwtDecode(parsed.token);
      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem("auth_user");
        return null;
      }

      return parsed;
    } catch (error) {
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
      const message =
        error.response?.data?.message ||
        "Login failed. Please check your credentials.";
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
      const message =
        error.response?.data?.message || "Signup failed. Please try again.";
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

  function userType() {
    if (!user?.token) return null;
    try {
      const decoded: any = jwtDecode(user.token);
      return decoded.userType;
    } catch {
      return null;
    }
  }

  function isTokenExpired() {
    if (!user?.token) return true;
    try {
      const decoded: any = jwtDecode(user.token);
      const currentTime = Date.now() / 1000;

      return decoded.exp < currentTime;
    } catch {
      return true;
    }
  }

  const authenticated = !!user && !isTokenExpired();

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateStoredUser,
        isAuthenticated: authenticated,
        userType,
        isTokenExpired,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
