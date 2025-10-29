"use client";

import {
  Globe,
  LogOut,
  Menu,
  Monitor,
  Moon,
  Receipt,
  Settings,
  Sun,
} from "lucide-react";

import { Button } from "@acme/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@acme/ui/components/dropdown-menu";

interface User {
  name: string;
  email?: string;
  logo: {
    url: string;
    name: string;
  };
}

interface UserDropdownProps {
  user: User;
  onLogout?: () => void;
  onSettings?: () => void;
  onTickets?: () => void;
  onLocaleChange?: (locale: string) => void;
  currentLocale?: string;
  availableLocales?: string[];
  onThemeChange?: (theme: string) => void;
  currentTheme?: string;
}

export function UserDropdown({
  user,
  onLogout,
  onSettings,
  onTickets,
  onLocaleChange,
  currentLocale = "en",
  availableLocales = ["en", "fr"],
  onThemeChange,
  currentTheme = "light",
}: UserDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hidden md:flex">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Open user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">{user.name}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onTickets}>
          <Receipt className="mr-2 h-4 w-4" />
          <span>My Tickets</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onSettings}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="px-2 py-1">
          <div className="mb-2 flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="text-muted-foreground text-xs">Language:</span>
            <div className="flex gap-1">
              {availableLocales.map((locale) => (
                <Button
                  key={locale}
                  variant={currentLocale === locale ? "default" : "outline"}
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={() => onLocaleChange?.(locale)}
                >
                  {locale.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            <span className="text-muted-foreground text-xs">Theme:</span>
            <div className="flex gap-1">
              <Button
                variant={currentTheme === "light" ? "default" : "outline"}
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() => onThemeChange?.("light")}
              >
                <Sun className="mr-1 h-3 w-3" />
                Light
              </Button>
              <Button
                variant={currentTheme === "dark" ? "default" : "outline"}
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() => onThemeChange?.("dark")}
              >
                <Moon className="mr-1 h-3 w-3" />
                Dark
              </Button>
              <Button
                variant={currentTheme === "system" ? "default" : "outline"}
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() => onThemeChange?.("system")}
              >
                <Monitor className="mr-1 h-3 w-3" />
                System
              </Button>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
