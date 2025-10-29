import { Env } from "@/libs/Env";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Log the app URL to verify environment configuration
  console.log("🏪 Vendors App - NEXT_PUBLIC_APP_URL:", Env.NEXT_PUBLIC_APP_URL);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
