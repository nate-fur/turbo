"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PostHogProvider } from "@/components/analytics/PostHogProvider";
import ThemeRegistry from "@/providers/ThemeRegistry";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { NextIntlClientProvider } from "next-intl";

import { AuthProvider } from "@acme/auth";

import "@/styles/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const locale = (params?.locale as string) || "en"; // Fallback to 'en' if locale is not available
  const [messages, setMessages] = useState<any>(null);

  useEffect(() => {
    async function loadMessages() {
      try {
        const msgs = await import(`@/locales/${locale}.json`);
        setMessages(msgs.default);
      } catch (error) {
        console.error(`Failed to load messages for locale ${locale}:`, error);
        // Fallback to English if the locale file doesn't exist
        const fallbackMsgs = await import("@/locales/en.json");
        setMessages(fallbackMsgs.default);
      }
    }

    loadMessages();
  }, [locale]);

  if (!messages) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AuthProvider>
        <PostHogProvider>
          <AppRouterCacheProvider>
            <ThemeRegistry>{children}</ThemeRegistry>
          </AppRouterCacheProvider>
        </PostHogProvider>
      </AuthProvider>
    </NextIntlClientProvider>
  );
}
