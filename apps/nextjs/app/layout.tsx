import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { env } from "../env";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Validate environment variables at startup
void env;

export const metadata: Metadata = {
  title: "T3 Turbo Monorepo",
  description: "Next.js app with workspace packages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
