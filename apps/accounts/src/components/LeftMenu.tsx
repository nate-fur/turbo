"use client";

import Link from "next/link";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useTranslations } from "next-intl";

export const LeftMenu = () => {
  const t = useTranslations("LeftMenu");

  const menuItems = [
    { text: t("home"), icon: <HomeIcon />, href: "/" },
    { text: t("profile"), icon: <InfoIcon />, href: "/profile" },
    { text: t("contact"), icon: <ContactMailIcon />, href: "/contact" },
  ];

  return (
    <List>
      {menuItems.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton component={Link} href={item.href}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
