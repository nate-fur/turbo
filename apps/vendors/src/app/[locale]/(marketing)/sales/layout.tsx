"use client";

import { useRouter } from "next/navigation";

import { NavMain } from "@acme/ui/components/molecules/sidenav/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from "@acme/ui/components/sidebar";
import { ShoppingCart, Users } from "@acme/ui/icons";

// Sales sidebar items from configs.tsx
const sidebarItems = [
  {
    title: "Product Sales",
    url: "/sales",
    icon: ShoppingCart,
    isActive: true,
    items: [
      {
        title: "Future",
        url: "/sales/future",
      },
      {
        title: "Past",
        url: "/sales/past",
      },
      {
        title: "Canceled",
        url: "/sales/canceled",
      },
    ],
  },
  {
    title: "Customers",
    url: "/customers",
    icon: Users,
    isActive: false,
    items: [
      {
        title: "Future",
        url: "/customers/future",
      },
      {
        title: "Past",
        url: "/customers/past",
      },
      {
        title: "Canceled",
        url: "/customers/canceled",
      },
    ],
  },
];

export default function SalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <SidebarProvider className="h-screen">
      <Sidebar className="mt-16 h-[calc(100vh-64px)]" collapsible="icon">
        <SidebarHeader></SidebarHeader>
        <SidebarContent>
          <NavMain
            items={sidebarItems.map((item) => ({
              ...item,
              onClick: () => {
                if (item.items && item.items.length > 0) {
                  return;
                }

                if (item.url && item.url !== "#") {
                  router.push(item.url);
                }
              },
              items: item.items?.map((subItem) => ({
                ...subItem,
                onClick: () => {
                  console.log("subItem.url", subItem.url);
                },
              })),
            }))}
          />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

      <SidebarInset className="mt-16 h-[calc(100vh-64px)]">
        <div className="h-full overflow-y-auto p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
