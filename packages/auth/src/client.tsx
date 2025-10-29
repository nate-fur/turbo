"use client";

import type { ReactNode } from "react";
import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

import type { AuthContextType, User } from "./types";

interface AuthResponse {
  user: User;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  authEndpoint?: string;
}

export function AuthProvider({
  children,
  authEndpoint = "/api/auth",
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status (exposed so we can call it after login)
  const checkAuth = async () => {
    try {
      const response = await fetch(`${authEndpoint}/me`);
      if (response.ok) {
        const data = (await response.json()) as AuthResponse;
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking auth:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    // run once on mount
    void checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authEndpoint]);

  const login = useMemo(() => {
    return async (email: string, password: string) => {
      const response = await fetch(`${authEndpoint}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier: email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = (await response.json()) as AuthResponse;
      // Set immediate user from login response then refresh auth state
      setUser(data.user);
      // Trigger a check to /api/auth/me to ensure server-side cookies (vendor_payload) are set
      // and user info is fully populated.
      try {
        await checkAuth();
      } catch (err) {
        // ignore checkAuth errors here; user is already set from login response
        console.error("checkAuth after login failed:", err);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authEndpoint]);

  const logout = useMemo(() => {
    return async () => {
      await fetch(`${authEndpoint}/logout`, {
        method: "POST",
      });
      setUser(null);
    };
  }, [authEndpoint]);

  const value = useMemo(
    () => ({ user, login, logout, loading }),
    [user, loading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to access authentication context
 * @throws Error if used outside of AuthProvider
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
