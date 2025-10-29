"use client";

import { useState } from "react";
import { Sidebar } from "@/components/SideNav";
import { Box, Container, Toolbar } from "@mui/material";

export default function SalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100%",
        width: "100%",
      }}
    >
      {/* Sidebar */}
      <Sidebar
        sidebarType="dashboard"
        open={sidebarOpen}
        onToggle={handleSidebarToggle}
      />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: "100%",
          width: {
            xs: "100%",
            sm: `calc(100% - ${sidebarOpen ? 280 : 72}px)`,
          },
          transition: (theme) =>
            theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          overflow: "hidden",
        }}
      >
        {/* Content Container */}
        <Container
          maxWidth={false}
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            py: 3,
            px: { xs: 2, sm: 3 },
            minHeight: 0, // Allow flex child to shrink
          }}
        >
          <Toolbar sx={{ minHeight: "auto", p: 0, mb: 2 }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              minHeight: 0, // Allow content to scroll if needed
            }}
          >
            {children}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
