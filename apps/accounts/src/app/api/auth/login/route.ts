import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Env } from "@/libs/Env";
import { COOKIE_NAMES, getAuthCookieOptions } from "@/utils/CookieConfig";
import { decodeJwt } from "jose";

const STRAPI_URL = Env.STRAPI_URL;

export async function POST(request: NextRequest) {
  try {
    const { identifier, password } = await request.json();

    // Call Strapi login endpoint
    const response = await fetch(`${STRAPI_URL}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const data = await response.json();
    const { jwt, user } = data;

    // Decode JWT to get user information and roles
    let userInfo;
    try {
      const payload = decodeJwt(jwt);
      userInfo = {
        id: user.id,
        name: user.username,
        email: user.email,
        roles: (payload as any).roles || [],
      };
    } catch {
      // Fallback to basic user info if JWT decoding fails
      userInfo = {
        id: user.id,
        name: user.username,
        email: user.email,
        roles: [],
      };
    }

    const cookieStore = await cookies();

    // Set access token cookie with cross-subdomain support
    cookieStore.set(COOKIE_NAMES.ACCESS_TOKEN, jwt, {
      ...getAuthCookieOptions(24 * 60 * 60), // 24 hours for better cross-domain experience
    });

    return NextResponse.json({ user: userInfo });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
