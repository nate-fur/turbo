import { Geist, Geist_Mono } from "next/font/google";

import "@acme/ui/globals.css";

import { Providers } from "@/components/providers";
import { Env } from "@/src/libs/Env";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Log the app URL to verify environment configuration
  console.log(
    "🛒 Checkout App - NEXT_PUBLIC_APP_URL:",
    Env.NEXT_PUBLIC_APP_URL,
  );

  return (
    <html lang="en" suppressHydrationWarning className="light">
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
