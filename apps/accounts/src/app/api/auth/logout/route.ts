import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_NAMES, getClearCookieOptions } from "@/utils/CookieConfig";

export async function POST(_request: NextRequest) {
  try {
    const cookieStore = await cookies();

    // Clear auth cookies with proper domain configuration
    cookieStore.set(COOKIE_NAMES.ACCESS_TOKEN, "", getClearCookieOptions());
    cookieStore.set(COOKIE_NAMES.VENDOR_PAYLOAD, "", getClearCookieOptions());

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
