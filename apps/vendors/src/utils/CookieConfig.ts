import { Env } from "@/libs/Env";

export type CookieOptions = {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
  path?: string;
  domain?: string;
  maxAge?: number;
};

/**
 * Get standardized cookie options for cross-subdomain authentication
 * @param maxAge - Cookie expiration in seconds
 * @param httpOnly - Whether the cookie should be HTTP-only (default: true)
 * @returns Cookie options object
 */
export function getAuthCookieOptions(
  maxAge?: number,
  httpOnly: boolean = true,
): CookieOptions {
  return {
    httpOnly, // Prevents XSS attacks when true
    secure: process.env.NODE_ENV === "production", // Only use HTTPS in production
    sameSite: "lax", // Allow cross-site requests from same site
    path: "/", // Available on all paths
    domain:
      Env.COOKIE_DOMAIN ||
      (process.env.NODE_ENV === "production" ? ".domain.local" : undefined),
    ...(maxAge && { maxAge }),
  };
}

/**
 * Get cookie options for clearing/deleting cookies
 * @returns Cookie options for deletion
 */
export function getClearCookieOptions(): CookieOptions {
  return {
    path: "/",
    domain:
      Env.COOKIE_DOMAIN ||
      (process.env.NODE_ENV === "production" ? ".domain.local" : undefined),
    maxAge: 0,
  };
}

/**
 * Standard cookie names used across the application
 */
export const COOKIE_NAMES = {
  ACCESS_TOKEN: "sb_access",
  LOGO_URL: "logo_url",
} as const;
