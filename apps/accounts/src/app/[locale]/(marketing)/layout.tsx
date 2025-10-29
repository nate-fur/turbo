"use client";

import { useRouter } from "next/navigation";

import { useAuth } from "@acme/auth/client";
import { NavMain } from "@acme/ui/components/molecules/sidenav/nav-main";
import {
  GreetingLabel,
  MobileMenu,
  SnowgroupLogo,
  TopNav,
  UserDropdown,
  VendorLogo,
} from "@acme/ui/components/molecules/topnav/index";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from "@acme/ui/components/sidebar";
import { Home, Info, LogOut, MailIcon } from "@acme/ui/icons";

const sidebarItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
    isActive: true,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: Info,
    isActive: false,
  },
  {
    title: "Contact",
    url: "#",
    icon: MailIcon,
    isActive: false,
  },
  {
    title: "Logout",
    url: "#",
    icon: LogOut,
    isActive: false,
  },
];

export default function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <SidebarProvider>
      <TopNav>
        <VendorLogo />
        <div className="flex items-center gap-4">
          <GreetingLabel name={user?.firstName ?? ""} />
          <SnowgroupLogo />
          <UserDropdown
            onLogout={async () => {
              await logout();
              router.push("/signin");
            }}
            user={{
              name: user?.firstName + " " + (user?.lastName ?? ""),
              email: user?.email ?? "",
              logo: { url: user?.logoURL ?? "", name: user?.name ?? "" },
            }}
          />
        </div>

        <MobileMenu
          tabs={[]}
          activeTab={""}
          onTabClick={function (_href: string): void {
            throw new Error("Function not implemented.");
          }}
        />
      </TopNav>

      <Sidebar
        className="mt-16 h-[calc(100vh-64px)]"
        collapsible="icon"
        {...props}
      >
        <SidebarHeader></SidebarHeader>
        <SidebarContent>
          <NavMain
            items={sidebarItems.map((item) => ({
              ...item,
              onClick: async () => {
                if (item.title === "Logout") {
                  await logout();
                  const segments = window.location.pathname
                    .split("/")
                    .filter(Boolean);
                  const locale = segments[0] ?? "en";
                  window.location.href = `/${locale}/signin`;
                } else if (item.url && item.url !== "#") {
                  router.push(item.url);
                }
              },
            }))}
          />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <div className="mt-16 p-8">{props.children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
