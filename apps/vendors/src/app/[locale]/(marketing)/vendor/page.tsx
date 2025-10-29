import { setRequestLocale } from "next-intl/server";

export default async function VendorDashboard(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow">
        <h1 className="text-2xl font-bold text-gray-900">Vendor Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome to your vendor portal. This page is protected by
          VendorRBACGuard.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-900">Orders</h2>
          <p className="mt-2 text-3xl font-bold text-blue-600">12</p>
          <p className="text-sm text-gray-500">New orders today</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-900">Revenue</h2>
          <p className="mt-2 text-3xl font-bold text-green-600">$2,345</p>
          <p className="text-sm text-gray-500">This month</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-900">Products</h2>
          <p className="mt-2 text-3xl font-bold text-purple-600">45</p>
          <p className="text-sm text-gray-500">Active listings</p>
        </div>
      </div>
    </div>
  );
}
