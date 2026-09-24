import { useState, useEffect, useCallback } from "react";

export type UserRole =
  | "superadmin"
  | "admin"
  | "team-leader"
  | "staff"
  | "hr"
  | "freelancer";

export interface AuthUser {
  id: number | string;
  name: string;
  email: string;
  role: UserRole;
  token: string;
}

const TOKEN_KEY = "authToken";
const ROLE_KEY = "userRole";
const EMAIL_KEY = "userEmail";
const ID_KEY = "userId";
const NAME_KEY = "userName";

export function getStoredAuth(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;

  return {
    token,
    role: (localStorage.getItem(ROLE_KEY) as UserRole) || "superadmin",
    email: localStorage.getItem(EMAIL_KEY) || "",
    id: localStorage.getItem(ID_KEY) || "",
    name: localStorage.getItem(NAME_KEY) || "User",
  };
}

export function saveAuthSession(user: AuthUser) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, user.token);
  localStorage.setItem(ROLE_KEY, user.role);
  localStorage.setItem(EMAIL_KEY, user.email);
  localStorage.setItem(ID_KEY, String(user.id));
  localStorage.setItem(NAME_KEY, user.name);

  // Trigger cross-tab/cross-hook update event
  window.dispatchEvent(new Event("auth-change"));
}

export function clearAuthSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(EMAIL_KEY);
  localStorage.removeItem(ID_KEY);
  localStorage.removeItem(NAME_KEY);

  window.dispatchEvent(new Event("auth-change"));
}

export function getRoleRedirect(role: UserRole | string): string {
  switch (role) {
    case "superadmin":
      return "/superadmin/dashboard";
    case "admin":
      return "/admin/dashboard";
    case "team-leader":
      return "/team-leader";
    case "staff":
      return "/staff/dashboard";
    case "hr":
      return "/hr-dashboard";
    case "freelancer":
      return "/freelancer/dashboard";
    default:
      return "/admin/dashboard";
  }
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(getStoredAuth);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(() => {
    setUser(getStoredAuth());
  }, []);

  useEffect(() => {
    refresh();
    const handleAuthChange = () => refresh();
    window.addEventListener("auth-change", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);
    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, [refresh]);

  const logout = useCallback(() => {
    clearAuthSession();
    setUser(null);
  }, []);

  return {
    user,
    isAuthenticated: !!user?.token,
    role: user?.role || null,
    logout,
    refresh,
    loading,
    setLoading,
  };
}

export const authService = {
  getUser: getStoredAuth,
  saveUser: saveAuthSession,
  logout: clearAuthSession,
  getRedirect: getRoleRedirect,
};
