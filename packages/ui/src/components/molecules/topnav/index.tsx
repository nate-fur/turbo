import { cn } from "@acme/ui/lib/utils";

// Export individual components
export { MobileMenu } from "./mobile-menu";
export { NavigationTabs } from "./navigation-tabs";
export { SnowgroupLogo } from "./snowgroup-logo";
export { GreetingLabel } from "./greeting-label";
export { UserDropdown } from "./user-dropdown";
export { VendorLogo } from "./vendor-logo";

export const TopNav = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <header
      className={cn(
        "bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed top-0 right-0 left-0 z-50 flex flex-row border-b backdrop-blur",
        className,
      )}
    >
      <div className="flex h-16 w-full items-center justify-between px-4">
        {children}
      </div>
    </header>
  );
};
