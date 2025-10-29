import { cn } from "@acme/ui/lib/utils";

import SGLogo from "./snowgroup.svg";

interface VendorLogoProps {
  className?: string;
}

export function VendorLogo({ className }: VendorLogoProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <img
        src={SGLogo.src}
        alt="Snow Group Logo"
        width={140}
        height={40}
        className="object-contain"
      />
    </div>
  );
}
