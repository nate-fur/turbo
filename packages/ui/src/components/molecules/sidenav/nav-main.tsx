// "use client";

import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@acme/ui/components/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@acme/ui/components/sidebar";
import { cn } from "@acme/ui/lib/utils";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    onClick?: () => void;
    items?: {
      title: string;
      url: string;
      onClick?: () => void;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className={cn(
              "group/collapsible rounded-md",
              "data-[state=closed]:hover:bg-sidebar-accent",
            )}
          >
            <SidebarMenuItem className={cn("truncate p-1.5")}>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  className="gap-4"
                  tooltip={item.title}
                  onClick={item.onClick}
                >
                  {item.icon && <item.icon className="size-6" size="xl" />}
                  {item.title}
                  {item.items && (
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item.items && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        {subItem.onClick ? (
                          <SidebarMenuSubButton onClick={subItem.onClick}>
                            <span>{subItem.title}</span>
                          </SidebarMenuSubButton>
                        ) : (
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        )}
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
