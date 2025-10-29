"use client";

import * as React from "react";
import { Link, usePathname } from "@/libs/I18nNavigation";
import { theme } from "@/providers/Theme";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";

type TabItem = {
  label: string;
  href: string;
  badge?: number;
};

type NavigationTabsProps = {
  orientation?: "horizontal" | "vertical";
  sx?: React.CSSProperties;
} & React.ComponentProps<typeof Tabs>;

export default function NavigationTabs({
  orientation = "horizontal",
  sx,
  ...props
}: NavigationTabsProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Navigation");

  const tabs: TabItem[] = [
    { label: t("dashboard_tab"), href: "/" },
    { label: t("sales_tab"), href: "/sales" },
  ];

  // Determine active tab based on current pathname (locale-aware)
  const getActiveTab = () => {
    // Remove locale prefix from pathname for comparison
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

    const currentTab = tabs.findIndex((tab) => {
      if (tab.href === "/") {
        return pathWithoutLocale === "/";
      }
      return pathWithoutLocale.startsWith(tab.href);
    });
    return currentTab >= 0 ? currentTab : 0;
  };

  const activeTab = getActiveTab();

  return (
    <Tabs
      value={activeTab}
      orientation={orientation}
      {...props}
      sx={{
        minHeight: "auto",
        "& .MuiTabs-indicator": {
          backgroundColor: theme.colors.secondary, // Orange color for active indicator
          height: orientation === "vertical" ? "auto" : 3,
          width: orientation === "vertical" ? 3 : "auto",
        },
        "& .MuiTab-root": {
          textTransform: "none",
          fontWeight: 600,
          fontSize: "14px",
          letterSpacing: "0.5px",
          padding: "8px 16px",
          minHeight: "auto",
          "&.Mui-selected": {
            color: theme.colors.secondary, // Orange color for active tab
          },
          "&:hover": {
            color: "#FF6B35",
            backgroundColor: "rgba(255, 107, 53, 0.04)",
          },
        },
        ...sx,
      }}
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.label}
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  fontSize: "12px",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                {tab.label}
              </Typography>
            </Box>
          }
          component={Link}
          href={tab.href}
          sx={{
            textDecoration: "none",
            "&:visited": {
              color: "inherit",
            },
          }}
        />
      ))}
    </Tabs>
  );
}
