import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Env } from "@/libs/Env";
import { COOKIE_NAMES, getAuthCookieOptions } from "@/utils/CookieConfig";

const STRAPI_URL = Env.STRAPI_URL;

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
    const vendorPayload = cookieStore.get(COOKIE_NAMES.VENDOR_PAYLOAD)?.value;

    if (!accessToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Fetch user data from Strapi
    const userResponse = await fetch(
      `${STRAPI_URL}/api/users/me?populate=personal`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    if (!userResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch user" },
        { status: 500 },
      );
    }

    const user = await userResponse.json();

    // Get vendor data
    if (!vendorPayload) {
      const vendorResponse = await fetch(`${STRAPI_URL}/api/vendors/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (vendorResponse.ok) {
        const { data: vendor } = await vendorResponse.json();
        if (!vendor) {
          return NextResponse.json({ user }, { status: 200 });
        }
        const payload = {
          documentId: vendor?.documentId,
          logoURL: vendor?.logo?.url ?? "",
          name: vendor?.name ?? "",
        };

        cookieStore.set(COOKIE_NAMES.VENDOR_PAYLOAD, JSON.stringify(payload), {
          ...getAuthCookieOptions(24 * 60 * 60), // 24 hours for better cross-domain experience
        });
      }
    }

    const userInfo = {
      email: user.email,
      firstName: user?.personal?.firstName ?? "",
      lastName: user?.personal?.lastName ?? "",
      dob: user?.personal?.dob ?? "",
      phone: user?.personal?.phone ?? "",
      gender: user?.personal?.gender ?? "",
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
