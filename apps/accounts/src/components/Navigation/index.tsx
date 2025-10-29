"use client";

import * as React from "react";
import Image from "next/image";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import Logout from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useAuth } from "@acme/auth/client";

type Props = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  windowAction?: () => Window;
  mountains?: any[]; // Add the mountains prop
};

const drawerWidth = 240;

export default function DrawerAppBar(props: Props) {
  const { windowAction } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // const _t = useTranslations('RootLayout');

  const theme = useTheme();
  const { user, logout } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

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

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        TEXT TITLE
      </Typography>
      <Divider />
      <List>
        <ListItem>
          <ListItemText primary="Item" />
        </ListItem>
      </List>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ px: 2, pb: 2 }}>
        <LocaleSwitcher
          sx={{
            "& .MuiToggleButton-root": {
              border: "1px solid rgba(0, 0, 0, 0.2)",
              color: "inherit",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.05)",
              },
              "&.Mui-selected": {
                backgroundColor: "rgba(25, 118, 210, 0.12)",
                color: "primary.main",
                "&:hover": {
                  backgroundColor: "rgba(25, 118, 210, 0.2)",
                },
              },
            },
          }}
        />
        {user && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {user.name || user.email}
            </Typography>
            <MenuItem
              onClick={async () => {
                handleDrawerToggle();
                await logout();
                // Redirect to signin page after logout
                const segments = window.location.pathname
                  .split("/")
                  .filter(Boolean);
                const locale = segments[0] || "en";
                window.location.href = `/${locale}/signin`;
              }}
              sx={{ py: 1, px: 2 }}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </Box>
        )}
      </Box>
    </Box>
  );

  const container =
    windowAction !== undefined ? () => windowAction().document.body : undefined;
  return (
    <>
      <AppBar
        component="nav"
        elevation={mounted && scrolled ? 2 : 0}
        position="sticky"
        sx={{
          bgcolor: mounted && scrolled ? "#fff" : "transparent",
          color: theme.palette.text.primary,
          borderBottom: "1px solid #E5E7EB",
          transition: "background-color 0.2s",
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            // component={Link}
            display="flex"
            alignItems="center"
            sx={{ gap: 1 }}
          >
            <Image
              src="/assets/images/snowgroup.svg"
              alt="SnowGroupLogo"
              width={160}
              height={40}
              priority
            />
            <Typography>Account</Typography>
          </Box>
          <Stack
            direction="row"
            spacing={2}
            sx={{ ml: 2, display: { xs: "none", md: "flex" } }}
          >
            {/* <Link href="/" color="inherit">{t('home_link')}</Link> */}
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <MenuItem
              onClick={async () => {
                await logout();
                // Redirect to signin page after logout
                const segments = window.location.pathname
                  .split("/")
                  .filter(Boolean);
                const locale = segments[0] || "en";
                window.location.href = `/${locale}/signin`;
              }}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
            </MenuItem>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
