"use client";

import { useCallback, useEffect, useState } from "react";
import { COOKIE_NAMES } from "@/utils/CookieConfig";
import { validateVendorRBAC } from "@/utils/VendorRBACValidation";

export default function VendorDebugPage() {
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [testResult, setTestResult] = useState<any>(null);

  useEffect(() => {
    // Get debug information
    const allCookies = document.cookie;
    const cookiesArray = allCookies.split(";").map((c) => c.trim());

    const accessToken = cookiesArray
      .find((cookie) => cookie.startsWith(`${COOKIE_NAMES.ACCESS_TOKEN}=`))
      ?.split("=")[1];

    // Get all cookie names for debugging
    const cookieNames = cookiesArray.map((cookie) => {
      const [name] = cookie.split("=");
      return name;
    });

    setDebugInfo({
      allCookies: allCookies ?? "No cookies found",
      cookiesArray,
      cookieNames,
      expectedCookieName: COOKIE_NAMES.ACCESS_TOKEN,
      accessToken: accessToken ?? "No access token found",
      strapiUrl: "STRAPI_URL is server-side only (check API route)",
      currentUrl: window.location.href,
      domain: window.location.hostname,
    });
  }, []);

  const testVendorRBAC = async () => {
    console.error("Testing vendor RBAC...");
    try {
      const result = await validateVendorRBAC();
      setTestResult(result);
      console.error("RBAC Test Result:", result);
    } catch (error) {
      console.error("RBAC Test Error:", error);
      setTestResult({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return (
    <div className="space-y-6 p-8">
      <h1 className="text-2xl font-bold">Vendor RBAC Debug Page</h1>

      <div className="rounded-lg bg-gray-100 p-4">
        <h2 className="text-lg font-semibold">Debug Information</h2>
        <pre className="mt-2 text-sm">{JSON.stringify(debugInfo, null, 2)}</pre>
      </div>

      <button
        type="button"
        onClick={testVendorRBAC}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Test Vendor RBAC API Call
      </button>

      {testResult && (
        <div className="rounded-lg bg-yellow-100 p-4">
          <h2 className="text-lg font-semibold">Test Result</h2>
          <pre className="mt-2 text-sm">
            {JSON.stringify(testResult, null, 2)}
          </pre>
        </div>
      )}

      <div className="text-sm text-gray-600">
        <p>This page helps debug the vendor RBAC validation:</p>
        <ul className="mt-2 list-disc pl-5">
          <li>Check if cookies are present</li>
          <li>Verify STRAPI_URL configuration</li>
          <li>Test the API call manually</li>
          <li>See detailed error messages</li>
        </ul>
      </div>
    </div>
  );
}
