import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { Env } from "@/libs/Env";
import { COOKIE_NAMES } from "@/utils/CookieConfig";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Button } from "@acme/ui/components/button";

interface IIndexProps {
  params: Promise<{ locale: string; palette: any }>;
}

export async function generateMetadata(props: IIndexProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: "Index",
  });

  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}

export default async function Index(props: IIndexProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const body =
    locale === "en"
      ? "Welcome to our website! Here we will show the application features."
      : "Bienvenue sur notre site web! Ici, nous allons vous montrer les fonctionnalités de l'application.";
  // Read vendor payload cookie on the server and validate documentId
  const cookieStore = await cookies();
  const vendorPayloadStr = cookieStore.get(COOKIE_NAMES.VENDOR_PAYLOAD)?.value;
  let hasValidVendor = false;

  if (vendorPayloadStr) {
    try {
      const parsed = JSON.parse(vendorPayloadStr);
      const documentId = parsed?.documentId;
      hasValidVendor =
        typeof documentId === "string" && documentId.trim().length > 0;
    } catch {
      // ignore invalid cookie payload
      hasValidVendor = false;
    }
  }

  return (
    <>
      <p>{body}</p>
      {hasValidVendor && (
        <Button asChild variant="link" size="sm" className="mt-4">
          <Link
            href={Env.NEXT_PUBLIC_VENDORS_URL ?? "/vendor"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open my Vendor Dashboard
          </Link>
        </Button>
      )}
    </>
  );
}
