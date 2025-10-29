/* eslint-disable no-restricted-properties */
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const Env = createEnv({
  server: {
    COOKIE_DOMAIN: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_ACCOUNTS_URL: z.string().url().optional(),
    NEXT_PUBLIC_VENDORS_URL: z.string().url().optional(),
    NEXT_PUBLIC_API_URL: z.string().url().optional(),
  },
  shared: {
    NODE_ENV: z.enum(["test", "development", "production"]).optional(),
  },
  // You need to destructure all the keys manually
  runtimeEnv: {
    COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_ACCOUNTS_URL: process.env.NEXT_PUBLIC_ACCOUNTS_URL,
    NEXT_PUBLIC_VENDORS_URL: process.env.NEXT_PUBLIC_VENDORS_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === "lint",
});
