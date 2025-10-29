import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Env } from "@/libs/Env";

/**
 * API route to validate vendor RBAC by forwarding the request to Strapi
 * This allows us to use HttpOnly cookies that aren't accessible to JavaScript
 */
export async function GET(request: NextRequest) {
  try {
    // Get the Strapi URL from environment
    const strapiUrl = Env.STRAPI_URL;

    if (!strapiUrl) {
      return NextResponse.json(
        {
          error:
            "STRAPI_URL not configured. Please set the STRAPI_URL environment variable.",
        },
        { status: 500 },
      );
    }

    // Extract sb_access token from cookies
    const cookies = request.headers.get("cookie") || "";
    const sbAccessMatch = cookies.match(/sb_access=([^;]+)/);
    const sbAccessToken = sbAccessMatch ? sbAccessMatch[1] : null;

    if (!sbAccessToken) {
      return NextResponse.json(
        { error: "sb_access token not found in cookies" },
        { status: 401 },
      );
    }

    // Forward the request to Strapi with Authorization header
    const response = await fetch(`${strapiUrl}/api/vendors/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sbAccessToken}`,
      },
    });

    // Forward the response from Strapi
    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json(
        {
          error: `Strapi request failed with status ${response.status}`,
          details: errorData,
        },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Vendor RBAC API error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
