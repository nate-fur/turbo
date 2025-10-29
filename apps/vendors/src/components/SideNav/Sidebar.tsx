"use client";

import * as React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Divider, IconButton, useTheme } from "@mui/material";

import type { SidebarMenuItem } from "./types";
import { getSidebarConfig } from "./configs";
import { Collapse, Drawer, List, ListItem, SubListItem } from "./ListItem";

type SidebarProps = {
  open: boolean;
  onToggle: () => void;
  variant?: "persistent" | "temporary";
  sidebarType?: "sales" | "dashboard";
};

const DRAWER_WIDTH_EXPANDED = 280;
const DRAWER_WIDTH_COLLAPSED = 80;

export default function Sidebar({
  open,
  onToggle,
  variant = "persistent",
  sidebarType = "sales",
}: SidebarProps) {
  const theme = useTheme();
  const config = getSidebarConfig(sidebarType);

  const [collapsed, setCollapsed] = React.useState(false);

  const [expandedItems, setExpandedItems] = React.useState<
    Record<string, boolean>
  >(() => {
    const initialState: Record<string, boolean> = {};
    config.menuItems.forEach((item) => {
      if (item.expandable) {
        initialState[item.id] = item.id === "product-sales"; // Keep product-sales expanded by default for sales sidebar
      }
    });
    return initialState;
  });

  const [activeSubItem, setActiveSubItem] = React.useState<string | null>(null);
  const [activeMainItem, setActiveMainItem] = React.useState<string | null>(
    null,
  );

  const handleMenuItemToggle = (itemId: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleMainItemClick = (itemId: string, onClick?: () => void) => {
    setActiveMainItem(itemId);
    setActiveSubItem(null);
    if (onClick) {
      onClick();
    }
  };

  const handleSubItemClick = (itemKey: string, onClick?: () => void) => {
    setActiveMainItem(null);
    setActiveSubItem(itemKey);
    if (onClick) {
      onClick();
    }
  };

  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
  };

  const renderMenuItem = (item: SidebarMenuItem) => {
    const isExpanded = expandedItems[item.id] || false;
    const isActiveMainItem = activeMainItem === item.id;
    const hasActiveSubItem =
      item.expandable &&
      item.subItems?.some((subItem) => activeSubItem === subItem.id);

    const isActive = isActiveMainItem || hasActiveSubItem;

    return (
      <React.Fragment key={item.id}>
        <ListItem
          icon={item.icon}
          text={item.text}
          onClick={
            item.expandable
              ? () => handleMenuItemToggle(item.id)
              : () => handleMainItemClick(item.id, item.onClick)
          }
          open={open && !collapsed}
          active={Boolean(isActive)}
          expandable={item.expandable}
          expanded={isExpanded}
        />

        {item.expandable && item.subItems && (
          <Collapse in={open && isExpanded} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              sx={{ pl: open && !collapsed ? 2 : 0 }}
            >
              {item.subItems.map((subItem) => (
                <SubListItem
                  key={subItem.id}
                  text={subItem.text}
                  icon={subItem.icon}
                  onClick={() =>
                    handleSubItemClick(subItem.id, subItem.onClick)
                  }
                  active={activeSubItem === subItem.id}
                  collapsed={collapsed}
                />
              ))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  return (
    <Drawer
      variant={variant}
      anchor="left"
      open={open}
      onClose={onToggle}
      sx={{
        width:
          open && !collapsed ? DRAWER_WIDTH_EXPANDED : DRAWER_WIDTH_COLLAPSED,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width:
            open && !collapsed ? DRAWER_WIDTH_EXPANDED : DRAWER_WIDTH_COLLAPSED,
          boxSizing: "border-box",
          border: "none",
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ffffff",
        }}
      >
        <List
          sx={{
            flexGrow: 1,
            px: 1,
            pt: 10,
          }}
        >
          <Divider sx={{ borderBottom: "1.5px solid #E5E7EB", mb: 1 }} />
          {config.menuItems.map((item) => renderMenuItem(item))}
          <Divider sx={{ borderBottom: "1.5px solid #E5E7EB", mt: 1 }} />
        </List>

        {/* Collapse toggle button at bottom right */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            p: 1,
          }}
        >
          <IconButton
            onClick={handleCollapseToggle}
            size="small"
            sx={{
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              color: "#6B7280",
              "&:hover": {
                backgroundColor: "#F3F4F6",
              },
            }}
          >
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Box>
      </Box>
    </Drawer>
  );
}
