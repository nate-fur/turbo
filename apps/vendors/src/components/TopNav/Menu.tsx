"use client";

import * as React from "react";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import Logout from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Settings from "@mui/icons-material/Settings";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";

import NavigationTabs from "./Tabs";

interface User {
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
}

interface MenuProps {
  user: User | null;
  onClose?: () => void;
}

interface MobileDrawerProps {
  user: User | null;
  container?: (() => HTMLElement) | undefined;
  drawerWidth: number;
  showButton?: boolean;
}

export function MobileDrawerMenu({
  user,
  container,
  drawerWidth,
  showButton = true,
}: MobileDrawerProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const drawer = (
    <Box onClick={handleDrawerClose} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Vendor Menu
      </Typography>
      <Divider />
      <Box sx={{ px: 2, py: 1 }}>
        <NavigationTabs
          orientation="vertical"
          sx={{
            "& .MuiTabs-flexContainer": {
              flexDirection: "column",
              alignItems: "stretch",
            },
            "& .MuiTab-root": {
              justifyContent: "flex-start",
              textAlign: "left",
              minHeight: "48px",
              padding: "12px 16px",
            },
          }}
        />
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ px: 2, pb: 2 }}>
        {user && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {user.name || user.email}
            </Typography>
            <MenuItem
              onClick={() => {
                handleDrawerClose();
                console.warn("Logout clicked");
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
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
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
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      {showButton && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ ml: "auto", display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        anchor="right"
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export function DropdownMenu({ user, onClose }: MenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const accountOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    onClose?.();
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Tooltip title="Account">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={accountOpen ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={accountOpen ? "true" : undefined}
        >
          <MenuIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={accountOpen}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar />
          {user?.name || "Profile"}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ReceiptIcon fontSize="small" />
          </ListItemIcon>
          My Tickets
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            console.warn("Logout clicked");
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
        <Divider />
        <Box sx={{ px: 2, py: 0.5, display: "flex", justifyContent: "end" }}>
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
        </Box>
      </Menu>
    </>
  );
}
