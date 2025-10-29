import type { ReactNode } from "react";

export interface SidebarMenuItem {
  id: string;
  text: string;
  icon: ReactNode;
  expandable?: boolean;
  subItems?: SidebarSubMenuItem[];
  onClick?: () => void;
}

export interface SidebarSubMenuItem {
  id: string;
  text: string;
  icon?: ReactNode;
  onClick?: () => void;
}

export type SidebarType = "sales" | "dashboard";

export interface SidebarConfig {
  type: SidebarType;
  menuItems: SidebarMenuItem[];
}
