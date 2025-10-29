"use client";

import { useLocale } from "next-intl";

// Helper function to get fetch options for client-side requests
export const getFetchOptions = (): RequestInit => {
  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    // In development, disable caching for fresh data on every request
    return {
      cache: "no-store",
    };
  }

  // In production, use default caching
  return {};
};

// Helper hook to get the effective locale for API calls
export const useEffectiveLocale = (explicitLocale?: string): string => {
  const currentLocale = useLocale();
  return explicitLocale || currentLocale;
};

// Generic hook state interface
export interface HookState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

// Generic hook for fetching a single item
export interface SingleHookState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
