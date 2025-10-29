import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@acme/ui/components/card";
import {
  BarChart3,
  Package,
  ShoppingCart,
  TrendingUp,
  UserCheck,
  Users,
} from "@acme/ui/icons";

interface IIndexProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(props: IIndexProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Sales" });

  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}

export default async function SalesPage(props: IIndexProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const body =
    locale === "en"
      ? "Track your sales performance and manage your customers."
      : "Suivez votre performance des ventes et gérez vos clients.";

  return (
    <div className="container mx-auto max-w-6xl">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          Sales Overview
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
          {body}
        </p>
      </div>

      {/* Feature Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="border-border/40">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 rounded-lg p-2">
                <BarChart3 className="text-primary h-6 w-6" />
              </div>
              <div>
                <CardTitle>Sales Analytics</CardTitle>
                <CardDescription>Track your sales performance</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              View detailed analytics of your sales performance, revenue trends,
              and product metrics.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 rounded-lg p-2">
                <ShoppingCart className="text-primary h-6 w-6" />
              </div>
              <div>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>Track and fulfill orders</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Manage your orders, track fulfillment status, and process refunds
              efficiently.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 rounded-lg p-2">
                <Package className="text-primary h-6 w-6" />
              </div>
              <div>
                <CardTitle>Product Performance</CardTitle>
                <CardDescription>Monitor top sellers</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Identify your best-selling products and optimize your inventory
              based on sales data.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 rounded-lg p-2">
                <Users className="text-primary h-6 w-6" />
              </div>
              <div>
                <CardTitle>Customer Insights</CardTitle>
                <CardDescription>Understand your customers</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Gain valuable insights into customer behavior, purchase patterns,
              and preferences.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 rounded-lg p-2">
                <TrendingUp className="text-primary h-6 w-6" />
              </div>
              <div>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>Track growth metrics</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Monitor revenue trends over time and identify growth
              opportunities.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 rounded-lg p-2">
                <UserCheck className="text-primary h-6 w-6" />
              </div>
              <div>
                <CardTitle>Customer Management</CardTitle>
                <CardDescription>Build stronger relationships</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Manage customer relationships, track interactions, and improve
              customer satisfaction.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
