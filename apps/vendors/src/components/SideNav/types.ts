import type { ReactNode } from "react";

export type SidebarMenuItem = {
  id: string;
  text: string;
  icon: ReactNode;
  expandable?: boolean;
  subItems?: SidebarSubMenuItem[];
  onClick?: () => void;
};

export type SidebarSubMenuItem = {
  id: string;
  text: string;
  icon?: ReactNode;
  onClick?: () => void;
};

export type SidebarType = "sales" | "dashboard";

export type SidebarConfig = {
  type: SidebarType;
  menuItems: SidebarMenuItem[];
};
