import { Snowflake } from "lucide-react";

import { cn } from "@acme/ui/lib/utils";

interface SnowgroupLogoProps {
  className?: string;
}

export function SnowgroupLogo({ className }: SnowgroupLogoProps) {
  return (
    <div className={cn("hidden items-center md:flex", className)}>
      <Snowflake className="text-primary h-10 w-10" />
    </div>
  );
}
