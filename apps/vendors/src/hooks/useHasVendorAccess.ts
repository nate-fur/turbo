"use client";

import { useVendorRBAC } from "@/hooks/useVendorRBAC";

/**
 * Simplified hook for just checking if the current user has vendor access
 * Useful for conditional rendering without full guard functionality
 */
export function useHasVendorAccess() {
  const { isValid, isValidating, vendor } = useVendorRBAC({
    validateOnMount: true,
    redirectOnFailure: false, // Don't redirect, just return the state
  });

  return {
    hasAccess: isValid === true,
    isLoading: isValidating,
    vendor,
  };
}
