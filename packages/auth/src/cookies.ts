import { authEnv } from "../env";

const env = authEnv();

export interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
  path?: string;
  domain?: string;
  maxAge?: number;
}

/**
 * Standard cookie names used across the application
 */
export const COOKIE_NAMES = {
  ACCESS_TOKEN: "sb_access",
  VENDOR_PAYLOAD: "vendor_payload",
} as const;

/**
 * Get standardized cookie options for cross-subdomain authentication
 * @param maxAge - Cookie expiration in seconds
 * @param httpOnly - Whether the cookie should be HTTP-only (default: true)
 * @param cookieDomain - Optional cookie domain for cross-subdomain support
 * @returns Cookie options object
 */
export function getAuthCookieOptions(
  maxAge?: number,
  httpOnly = true,
  cookieDomain?: string,
): CookieOptions {
  return {
    httpOnly, // Prevents XSS attacks when true
    secure: env.NODE_ENV === "production", // Only use HTTPS in production
    sameSite: "lax", // Allow cross-site requests from same site
    path: "/", // Available on all paths
    domain:
      cookieDomain ?? (env.NODE_ENV === "production" ? undefined : undefined),
    ...(maxAge && { maxAge }),
  };
}

/**
 * Get cookie options for clearing/deleting cookies
 * @param cookieDomain - Optional cookie domain for cross-subdomain support
 * @returns Cookie options for deletion
 */
export function getClearCookieOptions(cookieDomain?: string): CookieOptions {
  return {
    path: "/",
    domain:
      cookieDomain ?? (env.NODE_ENV === "production" ? undefined : undefined),
    maxAge: 0,
  };
}
