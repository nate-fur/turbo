import { VendorHeader } from "@/components/VendorHeader";
import { VendorRBACGuard } from "@/components/VendorRBACGuard";
import { setRequestLocale } from "next-intl/server";

export default async function VendorLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <VendorRBACGuard>
      <div className="min-h-screen bg-gray-50">
        <VendorHeader />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {props.children}
        </main>
      </div>
    </VendorRBACGuard>
  );
}
