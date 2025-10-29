import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Env } from "@/libs/Env";
import createMiddleware from "next-intl/middleware";

import { routing } from "./libs/I18nRouting";
import {
  checkUserRoles as checkRoles,
  getLoginRedirectUrl,
  validateSession,
} from "./utils/SessionValidation";

const handleI18nRouting = createMiddleware(routing);

// Routes that don't require authentication
const publicRoutes = ["/signin", "/api/auth/login", "/api/auth/logout"];

// Routes that require specific roles (without locale prefix)
const protectedRoutes = {
  "/admin": ["admin"],
  "/vendor": ["vendor", "admin"],
};

const locales = ["en", "fr"];
const ACCOUNTS_BASE_URL =
  Env.NEXT_PUBLIC_ACCOUNTS_BASE_URL || "https://accounts.domain.com";
const VENDORS_BASE_URL =
  Env.NEXT_PUBLIC_APP_URL || "https://vendors.domain.com";

// Check if a path is public (handles locale prefixes)
function isPublicPath(pathname: string): boolean {
  // Remove locale prefix if present
  const pathWithoutLocale = pathname.replace(/^\/(en|fr)/, "") || "/";

  // Check if the path matches any public route
  return publicRoutes.some((route) => {
    if (route.startsWith("/api/")) {
      // API routes should match exactly
      return pathname === route;
    }
    // For other routes, check if the path starts with the route
    return (
      pathWithoutLocale === route || pathWithoutLocale.startsWith(`${route}/`)
    );
  });
}

// Legacy function for backward compatibility
async function checkUserRoles(request: NextRequest, requiredRoles: string[]) {
  const sessionResult = validateSession(request);

  if (!sessionResult.isValid || !sessionResult.user) {
    return false;
  }

  return checkRoles(sessionResult.user.roles, requiredRoles);
}

// Improve security with Arcjet (disabled for development)
/*
const _aj = arcjet.withRule(
  detectBot({
    mode: 'LIVE',
    // Block all bots except the following
    allow: [
      // See https://docs.arcjet.com/bot-protection/identifying-bots
      'CATEGORY:SEARCH_ENGINE', // Allow search engines
      'CATEGORY:PREVIEW', // Allow preview links to show OG images
      'CATEGORY:MONITOR', // Allow uptime monitoring services
    ],
  })
);
*/

export default async function middleware(
  request: NextRequest,
  _event: NextFetchEvent,
) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for API routes to avoid loops
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Handle /vendors -> /vendor redirect (plural to singular)
  if (pathname.includes("/vendors")) {
    const correctedPath = pathname.replace("/vendors", "/vendor");
    return NextResponse.redirect(new URL(correctedPath, request.url));
  }

  // Temporary debugging for vendor routes
  if (pathname.includes("vendor")) {
    console.error("Vendor route accessed:", {
      pathname,
      method: request.method,
      hasArcjetKey: !!Env.ARCJET_KEY,
    });
  }

  // Verify the request with Arcjet (disabled for development)
  // TODO: Re-enable Arcjet once vendor routes are working
  /*
  if (Env.ARCJET_KEY) {
    try {
      const decision = await aj.protect(request);

      if (decision.isDenied()) {
        console.error('Arcjet blocked request:', {
          pathname,
          reason: decision.reason,
          userAgent: request.headers.get('user-agent'),
        });
        return NextResponse.json({ error: 'Forbidden', reason: 'Arcjet protection' }, { status: 403 });
      }
    } catch (error) {
      console.error('Arcjet error:', error);
      // Continue without Arcjet protection if it fails
    }
  }
  */
  const isPublicRoute = isPublicPath(pathname);

  // Temporarily make vendor routes public for testing
  const isVendorRoute = pathname.includes("/vendor");

  // Skip auth check for public routes or vendor routes (temporary)
  if (isPublicRoute || isVendorRoute) {
    return handleI18nRouting(request);
  }

  // Validate session using the new utility
  const sessionResult = validateSession(request);

  if (!sessionResult.isValid) {
    // Extract locale from pathname and construct proper login URL
    const segments = pathname.split("/").filter(Boolean);
    const locale =
      segments[0] && locales.includes(segments[0]) ? segments[0] : "en";

    // Check if we're already on a signin page to prevent infinite redirects
    const pathWithoutLocale = pathname.replace(/^\/(en|fr)/, "") || "/";
    if (pathWithoutLocale === "/signin") {
      return handleI18nRouting(request);
    }

    // Use the new login redirect utility
    const loginUrl = getLoginRedirectUrl(
      ACCOUNTS_BASE_URL,
      VENDORS_BASE_URL,
      locale,
      pathname,
    );
    // console.log('Redirecting to login:', loginUrl);
    return NextResponse.redirect(loginUrl);
  }

  // Check role-based access for protected routes
  const pathWithoutLocale = pathname.replace(/^\/(en|fr)/, "") || "/";
  for (const [route, roles] of Object.entries(protectedRoutes)) {
    if (pathWithoutLocale.startsWith(route)) {
      const hasAccess = await checkUserRoles(request, roles);
      if (!hasAccess) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }
  }

  return handleI18nRouting(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/_next`, `/_vercel` or `monitoring`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!_next|_vercel|monitoring|.*\\..*).*)",
};
