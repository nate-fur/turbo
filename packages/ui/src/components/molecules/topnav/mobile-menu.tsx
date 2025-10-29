"use client";

import {
  LogOut,
  Menu,
  Monitor,
  Moon,
  Receipt,
  Settings,
  Sun,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@acme/ui/components/avatar";
import { Button } from "@acme/ui/components/button";
import { Separator } from "@acme/ui/components/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@acme/ui/components/sheet";
import { cn } from "@acme/ui/lib/utils";

interface User {
  name: string;
  email?: string;
  logo: {
    url: string;
    name: string;
  };
}

interface TabItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  tabs: TabItem[];
  activeTab: string;
  onTabClick: (href: string) => void;
  user?: User | null;
  onLogout?: () => void;
  onSettings?: () => void;
  onTickets?: () => void;
  onLocaleChange?: (locale: string) => void;
  currentLocale?: string;
  availableLocales?: string[];
  onThemeChange?: (theme: string) => void;
  currentTheme?: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function MobileMenu({
  tabs,
  activeTab,
  onTabClick,
  user,
  onLogout,
  onSettings,
  onTickets,
  onLocaleChange,
  currentLocale = "en",
  availableLocales = ["en", "fr"],
  onThemeChange,
  currentTheme = "light",
}: MobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle>Vendor Menu</SheetTitle>
          <SheetDescription>Navigation and account options</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {/* Mobile Navigation Tabs */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Navigation</h3>
            <div className="space-y-1">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.href;
                return (
                  <Button
                    key={tab.href}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-xs font-semibold tracking-wide uppercase",
                      isActive &&
                        "text-secondary bg-secondary/10 hover:bg-secondary/20",
                    )}
                    onClick={() => onTabClick(tab.href)}
                  >
                    {tab.label}
                  </Button>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Mobile User Info */}
          {user && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.logo?.url} alt={user.name} />
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-muted-foreground text-xs">{user.email}</p>
                </div>
              </div>

              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={onTickets}
                >
                  <Receipt className="mr-2 h-4 w-4" />
                  My Tickets
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={onSettings}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  className="text-destructive w-full justify-start"
                  onClick={onLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          )}

          <Separator />

          {/* Mobile Language Switcher */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Language</h3>
            <div className="flex gap-2">
              {availableLocales.map((locale) => (
                <Button
                  key={locale}
                  variant={currentLocale === locale ? "default" : "outline"}
                  size="sm"
                  className="flex-1"
                  onClick={() => onLocaleChange?.(locale)}
                >
                  {locale.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>

          {/* Mobile Theme Switcher */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Theme</h3>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={currentTheme === "light" ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-1"
                onClick={() => onThemeChange?.("light")}
              >
                <Sun className="h-3 w-3" />
                Light
              </Button>
              <Button
                variant={currentTheme === "dark" ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-1"
                onClick={() => onThemeChange?.("dark")}
              >
                <Moon className="h-3 w-3" />
                Dark
              </Button>
              <Button
                variant={currentTheme === "system" ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-1"
                onClick={() => onThemeChange?.("system")}
              >
                <Monitor className="h-3 w-3" />
                System
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
