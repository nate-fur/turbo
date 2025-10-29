import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { Env } from "@/libs/Env";
import { COOKIE_NAMES, getAuthCookieOptions } from "@/utils/CookieConfig";
import { decodeJwt } from "jose";

const STRAPI_URL = Env.STRAPI_URL;

export async function POST(request: NextRequest) {
  try {
    // Check if user is already authenticated
    const cookieStore = await cookies();
    const existingToken = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
    if (existingToken) {
      try {
        const payload = decodeJwt(existingToken);
        const now = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp > now) {
          // Token is valid, return success without re-authenticating
          const html = `
<!DOCTYPE html>
<html>
<head>
  <title>SSO Login</title>
  <style>
    body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
    .success { color: green; }
  </style>
</head>
<body>
  <h2 class="success">Already authenticated</h2>
  <p>You will be redirected shortly...</p>
  <script>
    setTimeout(() => {
      window.close();
    }, 2000);
  </script>
</body>
</html>
          `;
          return new Response(html, {
            headers: { "Content-Type": "text/html" },
          });
        }
      } catch {
        // Token is invalid, continue with authentication
      }
    }
    const { legacyToken } = await request.json();

    if (!legacyToken) {
      return new Response("<html><body>Invalid request</body></html>", {
        status: 400,
        headers: { "Content-Type": "text/html" },
      });
    }

    // Translate legacy token to valid auth request
    const userResponse = await fetch(`${STRAPI_URL}/api/auth/legacySSO`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        legacyToken,
      }),
    });

    if (!userResponse.ok) {
      return new Response("<html><body>Authentication failed</body></html>", {
        status: 401,
        headers: { "Content-Type": "text/html" },
      });
    }

    const user = await userResponse.json();
    const jwt = user?.jwt;

    // Validate the JWT token
    if (!jwt || typeof jwt !== "string") {
      return new Response(
        "<html><body>Invalid authentication response</body></html>",
        {
          status: 500,
          headers: { "Content-Type": "text/html" },
        },
      );
    }

    // Verify the JWT is valid
    try {
      decodeJwt(jwt);
    } catch {
      return new Response("<html><body>Invalid token received</body></html>", {
        status: 500,
        headers: { "Content-Type": "text/html" },
      });
    }

    // Set the cookie
    cookieStore.set(COOKIE_NAMES.ACCESS_TOKEN, jwt, {
      ...getAuthCookieOptions(24 * 60 * 60),
    });

    // Return HTML for the popup
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>SSO Login</title>
  <style>
    body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
    .success { color: green; }
  </style>
</head>
<body>
  <h2 class="success">Login Successful</h2>
  <p>You will be redirected shortly...</p>
  <script>
    // The cookie is already set by the server
    setTimeout(() => {
      window.close();
    }, 2000);
  </script>
</body>
</html>
    `;

    return new Response(html, {
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {
    console.error("Legacy SSO error:", error);
    return new Response("<html><body>Internal server error</body></html>", {
      status: 500,
      headers: { "Content-Type": "text/html" },
    });
  }
}
