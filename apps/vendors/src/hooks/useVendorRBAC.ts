"use client";

import { useCallback, useEffect, useState } from "react";
import { Env } from "@/libs/Env";
import { validateVendorRBAC } from "@/utils/VendorRBACValidation";

type VendorInfo = {
  id: string;
  name: string;
  status: string;
} | null;

export interface UseVendorRBACResult {
  isValidating: boolean;
  isValid: boolean | null;
  vendor: VendorInfo;
  error: string | null;
  revalidate: () => Promise<void>;
}

/**
 * Hook to validate vendor RBAC permissions on page load/reload
 * This will automatically check permissions when the component mounts
 * and can be manually triggered for revalidation
 *
 * @param options Configuration options
 * @param options.validateOnMount Whether to validate immediately when the hook mounts (default: true)
 * @param options.redirectOnFailure Whether to redirect to login on validation failure (default: true)
 * @returns UseVendorRBACResult with validation state and controls
 */
export function useVendorRBAC(
  options: {
    validateOnMount?: boolean;
    redirectOnFailure?: boolean;
  } = {},
): UseVendorRBACResult {
  const { validateOnMount = true, redirectOnFailure = true } = options;

  // Note: We don't use AuthProvider here since validateVendorRBAC gets tokens from cookies directly
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [vendor, setVendor] = useState<VendorInfo>(null);
  const [error, setError] = useState<string | null>(null);

  const performValidation = useCallback(async () => {
    // Don't wait for AuthProvider - validateVendorRBAC gets token from cookies directly
    setIsValidating(true);
    setError(null);

    try {
      const result = await validateVendorRBAC();
      setIsValid(result.isValid);
      setVendor(result.user?.vendor ?? null);

      if (!result.isValid) {
        setError(result.error ?? "Validation failed");

        if (redirectOnFailure) {
          // Redirect to login/unauthorized page
          const segments = window.location.pathname.split("/").filter(Boolean);
          const locale = segments[0] ?? "en";

          // Store current path for redirect after login
          sessionStorage.setItem(
            "redirect_after_login",
            window.location.pathname,
          );

          // Redirect to accounts subdomain for login
          window.location.href = `${Env.NEXT_PUBLIC_ACCOUNTS_BASE_URL}/${locale}/signin?next=DIEGOISHERE`;
        }
      } else {
        // Clear any stored error state on successful validation
        setError(null);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown validation error";
      setError(errorMessage);
      setIsValid(false);
      setVendor(null);

      console.error("Vendor RBAC validation error:", err);
    } finally {
      setIsValidating(false);
    }
  }, [redirectOnFailure]);

  const revalidate = async () => {
    await performValidation();
  };

  // Effect to validate on mount
  useEffect(() => {
    if (validateOnMount) {
      void performValidation();
    }
  }, [validateOnMount, performValidation]);

  // Effect to handle page visibility changes (detect page reload/return)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Page became visible again, revalidate permissions
        void performValidation();
      }
    };

    // Add event listener for page visibility changes
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [performValidation]);

  return {
    isValidating,
    isValid,
    vendor,
    error,
    revalidate,
  };
}
