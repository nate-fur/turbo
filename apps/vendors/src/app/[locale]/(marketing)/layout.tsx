"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@acme/auth/client";
import {
  GreetingLabel,
  MobileMenu,
  NavigationTabs,
  SnowgroupLogo,
  TopNav,
  UserDropdown,
  VendorLogo,
} from "@acme/ui/components/molecules/topnav/index";
import { Separator } from "@acme/ui/components/separator";

interface User {
  id: number;
  documentId: string;
  name: string;
  email?: string;
  logo: {
    id: number;
    documentId: string;
    url: string;
    name: string;
  };
}

export default function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();

  useEffect(() => {
    async function getVendorData() {
      try {
        const response = await fetch("/api/vendor/rbac", {
          credentials: "include",
        });
        const { data } = await response.json();

        if (!data) {
          return;
        }

        setUser(data);
      } catch (error) {
        console.error(error);
      }
    }
    getVendorData();
  }, []);

  const onTabClick = (href: string) => {
    router.push(href);
  };

  // Determine active tab based on current path
  const getActiveTab = () => {
    if (pathname?.includes("/sales")) return "/sales";
    return "/";
  };

  const tabs = [
    { label: "Dashboard", href: "/" },
    { label: "Sales", href: "/sales" },
  ];

  return (
    <>
      <TopNav>
        <div className="flex items-center gap-4">
          <VendorLogo />
          <Separator orientation="vertical" className="hidden h-8 md:block" />
          <NavigationTabs
            tabs={tabs}
            activeTab={getActiveTab()}
            onTabClick={onTabClick}
          />
        </div>
        <div className="flex items-center gap-4">
          {user?.name && <GreetingLabel name={user.name} />}
          <SnowgroupLogo />
          {user && (
            <UserDropdown
              onLogout={() => {
                console.log("Logout clicked");
                logout();
              }}
              user={{
                name: user.name,
                email: user.email || "",
                logo: {
                  url: user.logo?.url || "",
                  name: user.logo?.name || "",
                },
              }}
            />
          )}
        </div>

        <MobileMenu
          tabs={tabs}
          activeTab={getActiveTab()}
          onTabClick={onTabClick}
        />
      </TopNav>
      <div className="bg-background">{props.children}</div>
    </>
  );
}
