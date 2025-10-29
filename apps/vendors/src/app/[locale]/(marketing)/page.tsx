import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Button } from "@acme/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@acme/ui/components/card";
import { BarChart3, Shield, Store, Users } from "@acme/ui/icons";

interface IIndexProps {
  params: Promise<{ locale: string; palette: unknown }>;
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

  return (
    <div className="container mx-auto mt-20 max-w-6xl px-4 py-12">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          Welcome to the Vendor Portal
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
          Manage your vendor account, track sales, and collaborate with your
          team all in one place.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="border-border/40">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 rounded-lg p-2">
                <Store className="text-primary h-6 w-6" />
              </div>
              <div>
                <CardTitle>Vendor Dashboard</CardTitle>
                <CardDescription>
                  Manage your products and inventory
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Access your complete vendor dashboard to manage products,
              inventory, and settings.
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
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>Work together seamlessly</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Collaborate with your team members and manage access with
              role-based permissions.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 rounded-lg p-2">
                <BarChart3 className="text-primary h-6 w-6" />
              </div>
              <div>
                <CardTitle>Analytics & Reporting</CardTitle>
                <CardDescription>Track your performance</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Get detailed insights into your sales performance and business
              metrics.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 rounded-lg p-2">
                <Shield className="text-primary h-6 w-6" />
              </div>
              <div>
                <CardTitle>Secure Access</CardTitle>
                <CardDescription>Protected by RBAC</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Your data is protected with industry-standard security and
              role-based access control.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* CTA */}
      <div className="mt-8 flex justify-center">
        <Button asChild size="lg" className="text-base">
          <Link href={`/${locale}/vendor`}>Access Vendor Portal</Link>
        </Button>
      </div>
    </div>
  );
}
