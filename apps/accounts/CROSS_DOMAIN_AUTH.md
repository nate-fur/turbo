# Cross-Subdomain Authentication Setup

This document explains how to configure cross-subdomain authentication for your multi-domain application.

## Overview

The authentication system has been updated to support cookie sharing across subdomains. The main authentication app runs on `accounts.domain.local`, and other apps on different subdomains can access the same authentication cookies.

## Environment Configuration

### Required Environment Variable

Add the following environment variable to your `.env` file:

```bash
# For local development
COOKIE_DOMAIN=.domain.local

# For production (replace with your actual domain)
COOKIE_DOMAIN=.yourdomain.com
```

The leading dot (`.`) is important as it allows the cookie to be accessible to all subdomains.

## How It Works

### Cookie Configuration

The system now uses standardized cookie settings:

- **Domain**: Set to `COOKIE_DOMAIN` environment variable for cross-subdomain access
- **HttpOnly**: `true` for security (prevents XSS attacks)
- **Secure**: `true` in production (requires HTTPS)
- **SameSite**: `lax` (allows cross-site requests from same site)
- **Path**: `/` (available on all paths)
- **MaxAge**: 24 hours for better cross-domain experience

### Cookie Names

- `sb_access`: Contains the JWT authentication token
- `logo_url`: Contains the vendor logo URL

## Usage Examples

### Local Development Setup

```bash
# Set up your hosts file to test subdomains locally
# Add these entries to /etc/hosts (macOS/Linux) or C:\Windows\System32\drivers\etc\hosts (Windows)

127.0.0.1 accounts.domain.local
127.0.0.1 app1.domain.local
127.0.0.1 app2.domain.local
```

### Environment Variables

```bash
# .env.local or .env
COOKIE_DOMAIN=.domain.local
NODE_ENV=development
STRAPI_URL=http://localhost:1337
```

### Production Setup

```bash
# .env.production
COOKIE_DOMAIN=.yourdomain.com
NODE_ENV=production
STRAPI_URL=https://api.yourdomain.com
```

## Security Considerations

1. **HTTPS Required in Production**: Cookies with `secure: true` only work over HTTPS
2. **Domain Validation**: Ensure your `COOKIE_DOMAIN` matches your actual domain structure
3. **HttpOnly Cookies**: Prevents JavaScript access to authentication tokens (XSS protection)
4. **SameSite Policy**: Protects against CSRF attacks while allowing subdomain access

## Testing

To test cross-subdomain authentication:

1. Set up local subdomains in your hosts file
2. Configure `COOKIE_DOMAIN=.domain.local` in your environment
3. Login on `accounts.domain.local`
4. Access other subdomains and verify the authentication state is preserved

## Troubleshooting

### Cookies Not Shared Across Subdomains

- Check that `COOKIE_DOMAIN` starts with a dot (`.domain.com`)
- Verify the domain in browser dev tools matches your configuration
- Ensure all apps are on the same parent domain

### Authentication Not Working

- Check browser console for cookie-related errors
- Verify JWT token is valid and not expired
- Ensure HTTPS is used in production with `secure: true` cookies

### Cookie Deletion Issues

- Make sure logout uses the same domain configuration as login
- Verify the cookie path and domain match exactly when clearing cookies

## Migration from Previous Setup

If you're updating from the previous cookie configuration:

1. Add the `COOKIE_DOMAIN` environment variable
2. Clear existing cookies in browser dev tools
3. Test login/logout flow to ensure proper cookie management
4. Update any custom cookie handling to use the new utility functions

## Files Modified

- `src/libs/Env.ts`: Added COOKIE_DOMAIN environment variable
- `src/utils/CookieConfig.ts`: New utility for consistent cookie configuration
- `src/app/api/auth/login/route.ts`: Updated to use cross-subdomain cookie settings
- `src/app/api/auth/logout/route.ts`: Updated to properly clear cookies with domain
- `src/middleware.ts`: Updated to use standardized cookie names
