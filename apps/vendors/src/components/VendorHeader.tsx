"use client";

import Link from "next/link";
import { useVendorRBAC } from "@/hooks/useVendorRBAC";

export function VendorHeader() {
  const { vendor } = useVendorRBAC({
    validateOnMount: false, // Don't re-validate since parent already does
    redirectOnFailure: false,
  });

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Vendor Portal
              </h1>
            </div>
            <nav className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/en/vendor"
                className="inline-flex items-center border-b-2 border-blue-500 px-1 pt-1 text-sm font-medium text-gray-900"
              >
                Dashboard
              </Link>
              <Link
                href="/en/vendor/products"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                Products
              </Link>
              <Link
                href="/en/vendor/orders"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                Orders
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            {vendor && (
              <div className="text-sm text-gray-700">
                <span className="font-medium">{vendor.name}</span>
                <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  {vendor.status}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
