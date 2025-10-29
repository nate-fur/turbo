"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AppBar, Box, Divider, Toolbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { GreetingLabel } from "./GreetingLabel";
import { DropdownMenu, MobileDrawerMenu } from "./Menu";
import NavigationTabs from "./Tabs";
import VendorLogo from "./VendorLogo";

type User = {
  id: number;
  documentId: string;
  name: string;
  email?: string;
  logo: {
    id: number;
    documentId: string;
    url: string;
    name: string;
  };
};

const drawerWidth = 240;

export default function TopNav() {
  const router = useRouter();
  const theme = useTheme();
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    async function getVendorData() {
      try {
        const response = await fetch("/api/vendor/rbac", {
          credentials: "include",
        });
        const { data } = await response.json();

        if (!data) {
          router.push("/404"); // Temporary page
          return;
        }

        setUser(data);
      } catch (error) {
        console.error(error);
        router.push("/404"); // Temporary page
      }
    }
    getVendorData();
  }, [router]);

  // Track scroll position for AppBar background, but only after mount to avoid hydration mismatch
  const [scrolled, setScrolled] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useLayoutEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    // Set initial scroll state on mount
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AppBar
        component="nav"
        elevation={mounted && scrolled ? 2 : 0}
        position="fixed"
        sx={{
          bgcolor: mounted && scrolled ? "#fff" : "#fff",
          color: theme.palette.text.primary,
          borderBottom: "1px solid #E5E7EB",
          transition: "background-color 0.2s",
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          <VendorLogo
            renderFallback={!!user && !user.logo?.url} // if a user exists but they don't have a logo, fallback to snowgroup image
            logoUrl={user?.logo?.url}
            width={140}
            height={40}
          />
          <Divider
            orientation="vertical"
            flexItem
            sx={{ marginY: "8px", ml: 2, display: { xs: "none", md: "block" } }}
          />
          <Box sx={{ ml: 2, display: { xs: "none", md: "flex" }, flexGrow: 1 }}>
            <NavigationTabs />
          </Box>
          <GreetingLabel
            labelText={user?.name}
            sx={{ display: { xs: "none", lg: "flex" }, mr: 2 }}
          />
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <Image
              src="/assets/images/Logo2.svg"
              alt="Snow Group Logo"
              width={44}
              height={44}
            />
            <DropdownMenu user={user} />
          </Box>
          <MobileDrawerMenu user={user} drawerWidth={drawerWidth} />
        </Toolbar>
      </AppBar>
    </>
  );
}
