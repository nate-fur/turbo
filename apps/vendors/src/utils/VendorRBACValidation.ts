export type VendorRBACResult = {
  isValid: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    roles: string[];
    vendor?: {
      id: string;
      name: string;
      status: string;
    };
  };
  error?: string;
};

/**
 * Validates user RBAC permissions by querying the backend on page reload
 * This ensures the user has the correct permissions and their vendor access is still valid
 * @returns Promise<VendorRBACResult> with validation status and user info
 */
/**
 * Fallback method to validate RBAC via API route when cookies aren't accessible to JavaScript
 */
const validateVendorRBACViaAPIRoute = async (): Promise<VendorRBACResult> => {
  try {
    const response = await fetch("/api/vendor/rbac", {
      method: "GET",
      credentials: "include", // Important: include cookies in the request
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        isValid: false,
        error: `API route validation failed: ${response.status} - ${errorData.error || "Unknown error"}`,
      };
    }

    const vendorData = await response.json();

    return {
      isValid: true,
      user: vendorData,
    };
  } catch (error) {
    console.error("Error validating vendor RBAC via API route:", error);
    return {
      isValid: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

export const validateVendorRBAC = async (): Promise<VendorRBACResult> => {
  // Always use the API route since STRAPI_URL is server-side only
  return await validateVendorRBACViaAPIRoute();
};

/**
 * Checks if the current user has vendor access based on RBAC validation
 * This is a convenience function that wraps validateVendorRBAC
 * @returns Promise<boolean> - True if user has valid vendor access
 */
export async function hasVendorAccess(): Promise<boolean> {
  const result = await validateVendorRBAC();
  return result.isValid;
}

/**
 * Gets the current vendor information for the authenticated user
 * @returns Promise<{id: string; name: string; status: string} | null> - Vendor info or null
 */
export async function getCurrentVendor(): Promise<{
  id: string;
  name: string;
  status: string;
} | null> {
  const result = await validateVendorRBAC();
  return result.user?.vendor || null;
}
