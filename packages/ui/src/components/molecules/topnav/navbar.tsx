"use client";

import * as React from "react";

import { Separator } from "@acme/ui/components/separator";
import { cn } from "@acme/ui/lib/utils";

import DogAvatar from "./DogAvatar.svg";
import { MobileMenu } from "./mobile-menu";
import { NavigationTabs } from "./navigation-tabs";
import { SnowgroupLogo } from "./snowgroup-logo";
import { UserDropdown } from "./user-dropdown";
import { VendorLogo } from "./vendor-logo";

export interface User {
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

export interface TabItem {
  label: string;
  href: string;
}

export interface NavbarProps {
  user?: User | null;
  tabs?: TabItem[];
  activeTab?: string;
  onLogout?: () => void;
  onSettings?: () => void;
  onTickets?: () => void;
  onLocaleChange?: (locale: string) => void;
  currentLocale?: string;
  availableLocales?: string[];
  onTabClick?: (href: string) => void;
  onThemeChange?: (theme: string) => void;
  currentTheme?: string;
  className?: string;
}

export function Navbar({
  user,
  tabs = [
    { label: "Dashboard", href: "/" },
    { label: "Sales", href: "/sales" },
  ],
  activeTab,
  onLogout,
  onSettings,
  onTickets,
  onLocaleChange,
  currentLocale = "en",
  availableLocales = ["en", "fr"],
  onTabClick,
  onThemeChange,
  currentTheme = "light",
  className,
}: NavbarProps) {
  const [internalActiveTab, setInternalActiveTab] = React.useState(
    activeTab ?? tabs[0]?.href,
  );

  React.useEffect(() => {
    if (activeTab) {
      setInternalActiveTab(activeTab);
    }
  }, [activeTab]);

  const handleTabClick = (href: string) => {
    setInternalActiveTab(href);
    onTabClick?.(href);
  };

  return (
    <header
      className={cn(
        "bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur",
        className,
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center gap-4">
          <VendorLogo />

          <Separator orientation="vertical" className="hidden h-8 md:block" />

          <NavigationTabs
            tabs={tabs}
            activeTab={internalActiveTab ?? tabs[0]?.href ?? ""}
            onTabClick={handleTabClick}
            variant="desktop"
          />
        </div>

        {/* Right side - User info and actions */}
        <div className="flex items-center gap-4">
          {/* Greeting Label - Desktop */}
          {user?.name && (
            <div className="hidden items-center lg:flex">
              <div className="relative flex h-10 items-center">
                <div className="bg-background border-border flex h-full items-center rounded-xl border px-3 pr-10">
                  <span className="text-foreground text-xs font-bold">
                    Hi {user.name}
                  </span>
                </div>
                <div className="border-foreground bg-background absolute -right-2 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2">
                  <img
                    src={DogAvatar.src}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          <SnowgroupLogo />

          {/* User Dropdown Menu - Desktop */}
          {user && (
            <UserDropdown
              user={user}
              onLogout={onLogout}
              onSettings={onSettings}
              onTickets={onTickets}
              onLocaleChange={onLocaleChange}
              currentLocale={currentLocale}
              availableLocales={availableLocales}
              onThemeChange={onThemeChange}
              currentTheme={currentTheme}
            />
          )}

          {/* Mobile Menu */}
          <MobileMenu
            tabs={tabs}
            activeTab={internalActiveTab ?? ""}
            onTabClick={handleTabClick}
            user={user}
            onLogout={onLogout}
            onSettings={onSettings}
            onTickets={onTickets}
            onLocaleChange={onLocaleChange}
            currentLocale={currentLocale}
            availableLocales={availableLocales}
            onThemeChange={onThemeChange}
            currentTheme={currentTheme}
          />
        </div>
      </div>
    </header>
  );
}
