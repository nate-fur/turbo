import { useAuth } from "@acme/auth/client";

export const useRBAC = () => {
  const { user } = useAuth();

  const hasRole = (role: string): boolean => {
    return user?.roles?.includes(role) || false;
  };

  const hasAnyRole = (roles: string[]): boolean => {
    return roles.some((role) => hasRole(role));
  };

  const hasAllRoles = (roles: string[]): boolean => {
    return roles.every((role) => hasRole(role));
  };

  const isAdmin = (): boolean => hasRole("admin");
  const isVendor = (): boolean => hasRole("vendor");
  const isUser = (): boolean => hasRole("user");

  return {
    hasRole,
    hasAnyRole,
    hasAllRoles,
    isAdmin,
    isVendor,
    isUser,
    user,
  };
};

// Server-side RBAC utilities
export const checkServerRole = (user: any, role: string): boolean => {
  return user?.roles?.includes(role) || false;
};

export const checkServerAnyRole = (user: any, roles: string[]): boolean => {
  return roles.some((role) => checkServerRole(user, role));
};

export const checkServerAllRoles = (user: any, roles: string[]): boolean => {
  return roles.every((role) => checkServerRole(user, role));
};
