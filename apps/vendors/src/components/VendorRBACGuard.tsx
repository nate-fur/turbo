"use client";

import { useVendorRBAC } from "@/hooks/useVendorRBAC";

/**
 * Component that demonstrates how to use the vendor RBAC validation hook
 * This can be placed in layouts or pages that require vendor access validation
 */
export function VendorRBACGuard({ children }: { children: React.ReactNode }) {
  const { isValidating, isValid, vendor, error } = useVendorRBAC({
    validateOnMount: true,
    redirectOnFailure: true,
  });

  // Show loading state while validating
  if (isValidating) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Validating permissions...</p>
        </div>
      </div>
    );
  }

  // Show redirecting state if validation failed (since redirectOnFailure is true)
  if (error && isValid === false) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Show vendor info and render children when validation is successful
  if (isValid && vendor) {
    return (
      <>
        {/* Optional: Display vendor info in a header or sidebar */}
        <div
          className="hidden"
          data-vendor-id={vendor.id}
          data-vendor-name={vendor.name}
        />
        {children}
      </>
    );
  }

  // Fallback loading state
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
    </div>
  );
}
