import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { validateSession } from "@/utils/SessionValidation";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("sb_access")?.value;

    if (!accessToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Use SessionValidation to validate cookies (pass the cookie string)
    const sessionResult = validateSession(`sb_access=${accessToken}`);

    if (!sessionResult.isValid || !sessionResult.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get vendor payload if available
    const vendorPayloadCookie = cookieStore.get("vendor_payload");
    let logoURL = "";
    if (vendorPayloadCookie?.value) {
      try {
        const vendorPayload = JSON.parse(vendorPayloadCookie.value);
        logoURL = vendorPayload.logoURL ?? "";
      } catch {
        // Ignore parsing errors
      }
    }

    const userInfo = {
      id: sessionResult.user.id,
      name: sessionResult.user.name,
      email: sessionResult.user.email,
      logoURL,
      roles: sessionResult.user.roles ?? [],
    };

    return NextResponse.json({ user: userInfo });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
