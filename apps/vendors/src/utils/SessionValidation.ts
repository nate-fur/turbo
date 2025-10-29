import type { NextRequest } from "next/server";
import { decodeJwt } from "jose";

import { COOKIE_NAMES } from "./CookieConfig";

export interface SessionValidationResult {
  isValid: boolean;
  isExpired: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    roles: string[];
  };
  error?: string;
}

/**
 * Validates the session token from the wildcard cookie set by accounts.domain.com
 * @param request - Next.js request object or cookies string
 * @returns SessionValidationResult with validation status and user info
 */
export function validateSession(
  request: NextRequest | string,
): SessionValidationResult {
  try {
    let accessToken: string | undefined;

    if (typeof request === "string") {
      // Parse cookies from string (client-side usage)
      const cookies = request.split(";");
      const accessTokenCookie = cookies.find((cookie) =>
        cookie.trim().startsWith(`${COOKIE_NAMES.ACCESS_TOKEN}=`),
      );
      accessToken = accessTokenCookie?.split("=")[1];
    } else {
      // Extract from NextRequest (server-side usage)
      accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
    }

    if (!accessToken || accessToken === "undefined" || accessToken === "null") {
      return {
        isValid: false,
        isExpired: false,
        error: "No access token found",
      };
    }

    // Decode the JWT to get user information and expiry
    const payload = decodeJwt(accessToken);
    const now = Math.floor(Date.now() / 1000);

    // Check if token is expired
    const isExpired = payload.exp ? payload.exp < now : false;

    if (isExpired) {
      return {
        isValid: false,
        isExpired: true,
        error: "Token has expired",
      };
    }

    // Extract user information from the token
    const user = {
      id: payload.sub || "unknown",
      name: (payload as any).username || (payload as any).name || "User",
      email: (payload as any).email || "user@example.com",
      roles: (payload as any).roles || [],
    };

    return {
      isValid: true,
      isExpired: false,
      user,
    };
  } catch (error) {
    return {
      isValid: false,
      isExpired: false,
      error: `Token validation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

/**
 * Checks if a user has any of the required roles
 * @param userRoles - Array of user roles
 * @param requiredRoles - Array of required roles (user needs at least one)
 * @returns boolean indicating if user has access
 */
export function checkUserRoles(
  userRoles: string[],
  requiredRoles: string[],
): boolean {
  return requiredRoles.some((role) => userRoles.includes(role));
}

/**
 * Generates the login redirect URL for accounts.domain.com
 * @param accountsBaseUrl - Base URL for the accounts subdomain
 * @param vendorsBaseUrl - Base URL for the vendors subdomain
 * @param locale - Current locale (en, fr, etc.)
 * @param currentPath - Current path to redirect back to after login
 * @returns Complete login URL with return path
 */
export function getLoginRedirectUrl(
  accountsBaseUrl: string,
  vendorsBaseUrl: string,
  locale = "en",
  currentPath = "/",
): string {
  const loginUrl = new URL("/signin", accountsBaseUrl);

  // Construct the return URL with locale subdomain
  const returnUrl = new URL(currentPath, vendorsBaseUrl);

  // Add locale subdomain if not already present
  if (!returnUrl.hostname.startsWith(`${locale}.`)) {
    returnUrl.hostname = `${returnUrl.hostname}`;
  }

  loginUrl.searchParams.set("next", returnUrl.toString());

  return loginUrl.toString();
}
