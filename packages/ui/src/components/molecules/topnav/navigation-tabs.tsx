"use client";

import { Button } from "@acme/ui/components/button";
import { cn } from "@acme/ui/lib/utils";

interface TabItem {
  label: string;
  href: string;
}

interface NavigationTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabClick: (href: string) => void;
  className?: string;
  variant?: "desktop" | "mobile";
}

export function NavigationTabs({
  tabs,
  activeTab,
  onTabClick,
  className,
  variant = "desktop",
}: NavigationTabsProps) {
  if (variant === "desktop") {
    return (
      <div className={cn("hidden md:flex", className)}>
        <nav className="flex space-x-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.href;
            return (
              <Button
                key={tab.href}
                variant="ghost"
                onClick={() => onTabClick(tab.href)}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide uppercase",
                  isActive && "text-secondary rounded-b-none",
                )}
              >
                {tab.label}
                {isActive && (
                  <div className="bg-secondary absolute right-0 bottom-0 left-0 h-0.5" />
                )}
              </Button>
            );
          })}
        </nav>
      </div>
    );
  }

  // Mobile variant
  return (
    <div className={cn("space-y-1", className)}>
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
  );
}
