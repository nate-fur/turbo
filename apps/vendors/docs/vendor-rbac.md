# Vendor RBAC Validation Utility

This utility provides automatic RBAC (Role-Based Access Control) validation for the Snowclub Vendors frontend application. It ensures users have the correct permissions by validating against the Strapi backend on page load/reload.

## Overview

The utility consists of three main components:

1. **`VendorRBACValidation.ts`** - Core validation functions that query the backend
2. **`useVendorRBAC.ts`** - React hook for automatic validation in components
3. **`VendorRBACGuard.tsx`** - UI component that provides authentication flow

## How It Works

When a page is loaded or reloaded, the utility:

1. Extracts the JWT access token from cookies
2. Makes an authenticated request to `STRAPI_URL/api/vendors/me`
3. Validates the response contains proper user and vendor data
4. Updates the authentication state accordingly
5. Redirects to login if validation fails (configurable)

## Usage

### Basic Hook Usage

```tsx
import { useVendorRBAC } from "@/hooks/useVendorRBAC";

function MyVendorPage() {
  const { isValidating, isValid, vendor, error, revalidate } = useVendorRBAC();

  if (isValidating) {
    return <div>Validating permissions...</div>;
  }

  if (!isValid) {
    return (
      <div>
        Access denied:
        {error}
      </div>
    );
  }

  return (
    <div>
      <h1>
        Welcome to
        {vendor?.name}
      </h1>
      {/* Your vendor-specific content */}
    </div>
  );
}
```

### Using the Guard Component

```tsx
import { VendorRBACGuard } from "@/components/VendorRBACGuard";

function VendorLayout({ children }: { children: React.ReactNode }) {
  return <VendorRBACGuard>{children}</VendorRBACGuard>;
}
```

### Conditional Rendering Hook

```tsx
import { useHasVendorAccess } from "@/hooks/useHasVendorAccess";

function NavigationMenu() {
  const { hasAccess, isLoading, vendor } = useHasVendorAccess();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <nav>
      <a href="/">Home</a>
      {hasAccess && (
        <>
          <a href="/vendor/dashboard">Dashboard</a>
          <a href="/vendor/settings">Settings</a>
          <span>
            Logged in as:
            {vendor?.name}
          </span>
        </>
      )}
    </nav>
  );
}
```

## Configuration Options

### useVendorRBAC Options

```tsx
useVendorRBAC({
  validateOnMount: true, // Validate immediately when component mounts
  redirectOnFailure: true, // Redirect to login page if validation fails
});
```

## API Endpoints

The utility expects the backend to provide:

### `GET /api/vendors/me`

**Headers:**

- `Authorization: Bearer <jwt_token>`
- `Content-Type: application/json`

**Success Response (200):**

```json
{
  "user": {
    "id": "user123",
    "username": "john_doe",
    "email": "john@example.com",
    "roles": ["vendor", "admin"]
  },
  "vendor": {
    "id": "vendor456",
    "name": "Acme Snow Equipment",
    "status": "active"
  }
}
```

**Error Responses:**

- `401`: Authentication failed (invalid/expired token)
- `403`: Access denied (insufficient permissions)
- `404`: Vendor not found for user

## Environment Variables

Ensure these environment variables are configured:

```env
# Required
STRAPI_URL=http://localhost:1337

# Optional (for redirects)
```

## Integration Examples

### In Next.js Layout

```tsx
// app/[locale]/vendor/layout.tsx
import { VendorRBACGuard } from "@/components/VendorRBACGuard";

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <VendorRBACGuard>
      <div className="vendor-layout">{children}</div>
    </VendorRBACGuard>
  );
}
```

### In Middleware (Alternative Approach)

```tsx
import type { NextRequest } from "next/server";
// middleware.ts
import { NextResponse } from "next/server";
import { validateSession } from "@/utils/SessionValidation";

export function middleware(request: NextRequest) {
  // Check if accessing vendor routes
  if (request.nextUrl.pathname.startsWith("/vendor")) {
    const sessionResult = validateSession(request);

    if (!sessionResult.isValid) {
      // Redirect to login
      const loginUrl = new URL("/signin", request.url);
      loginUrl.searchParams.set("next", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/vendor/:path*"],
};
```

## Troubleshooting

### Common Issues

1. **"Cannot find module 'react'"**
   - Ensure React types are installed: `npm install @types/react`

2. **"No access token found"**
   - Check that the user is logged in and the cookie is set correctly
   - Verify `COOKIE_DOMAIN` is configured properly for cross-subdomain access

3. **"Authentication failed"**
   - Token may be expired or invalid
   - Check JWT secret configuration between frontend and Strapi

4. **"Access denied - insufficient permissions"**
   - User doesn't have vendor role
   - Vendor account may be inactive

### Debug Mode

Enable debug logging by adding to your component:

```tsx
const { error } = useVendorRBAC();
console.log("RBAC Error:", error); // Only in development
```

## Security Considerations

- The validation happens client-side but relies on server-side JWT validation
- Always implement server-side validation for sensitive operations
- Token expiry is handled automatically with redirects
- Consider implementing refresh token logic for better UX

## Performance Notes

- Validation is cached per session to avoid repeated API calls
- Page visibility changes trigger revalidation (detects tab switching/reload)
- Uses `useCallback` and proper dependency arrays to prevent unnecessary re-renders
