import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import arcjet from "@/libs/Arcjet";
import { COOKIE_NAMES } from "@/utils/CookieConfig";
import { detectBot } from "@arcjet/next";
import { decodeJwt } from "jose";
import createMiddleware from "next-intl/middleware";

import { routing } from "./libs/I18nRouting";

const handleI18nRouting = createMiddleware(routing);

// Routes that don't require authentication
const publicRoutes = [
  "/signin",
  "/api/auth/login",
  "/api/auth/logout",
  "/api/legacySSO",
];

// Routes that require specific roles
const protectedRoutes = {
  "/admin": ["admin"],
  "/vendor": ["vendor", "admin"],
};

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

// Check if user has required roles
async function checkUserRoles(request: NextRequest, requiredRoles: string[]) {
  const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;

  if (!accessToken) {
    return false;
  }

  try {
    // Decode JWT without signature verification (for development)
    const payload = decodeJwt(accessToken);
    const userRoles = (payload.roles as string[]) || [];
    return requiredRoles.some((role) => userRoles.includes(role));
  } catch {
    return false;
  }
}

// Check if token is expired
async function isTokenExpired(request: NextRequest) {
  const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;

  if (!accessToken) {
    return true;
  }

  try {
    // Decode JWT without signature verification
    const payload = decodeJwt(accessToken);
    const now = Math.floor(Date.now() / 1000);
    return payload.exp ? payload.exp < now : false;
  } catch {
    return true;
  }
}

// Improve security with Arcjet
const aj = arcjet.withRule(
  detectBot({
    mode: "LIVE",
    // Block all bots except the following
    allow: [
      // See https://docs.arcjet.com/bot-protection/identifying-bots
      "CATEGORY:SEARCH_ENGINE", // Allow search engines
      "CATEGORY:PREVIEW", // Allow preview links to show OG images
      "CATEGORY:MONITOR", // Allow uptime monitoring services
    ],
  }),
);

export default async function middleware(
  request: NextRequest,
  _event: NextFetchEvent,
) {
  // Skip middleware for API routes to avoid loops
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Verify the request with Arcjet
  if (process.env.ARCJET_KEY) {
    const decision = await aj.protect(request);

    if (decision.isDenied()) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  const pathname = request.nextUrl.pathname;
  const isPublicRoute = isPublicPath(pathname);

  // Skip auth check for public routes
  if (isPublicRoute) {
    return handleI18nRouting(request);
  }

  // Check if access token exists and is valid
  const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;

  if (!accessToken || (await isTokenExpired(request))) {
    // Extract locale from pathname and construct proper login URL
    const segments = pathname.split("/").filter(Boolean);
    const locale = segments[0] || "en";

    // Check if we're already on a signin page to prevent infinite redirects
    const pathWithoutLocale = pathname.replace(/^\/(en|fr)/, "") || "/";
    if (pathWithoutLocale === "/signin") {
      return handleI18nRouting(request);
    }

    const loginUrl = new URL(`/${locale}/signin`, request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check role-based access for protected routes
  for (const [route, roles] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(route)) {
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
