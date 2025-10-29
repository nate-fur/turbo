import { setRequestLocale } from "next-intl/server";

export default async function DebugPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="space-y-4 p-8">
      <h1 className="text-2xl font-bold">Debug Page</h1>
      <p>If you can see this page, the middleware is working correctly.</p>
      <p>
        Current locale:
        {locale}
      </p>
      <div className="mt-4">
        <a
          href={`/${locale}/vendor`}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Go to Vendor Portal
        </a>
      </div>
    </div>
  );
}
