"use client";

import * as React from "react";
import { theme as customTheme } from "@/providers/Theme";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create the MUI theme on the client only
  const muiTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          primary: { main: customTheme.colors.primary },
          secondary: { main: customTheme.colors.secondary },
          background: { default: customTheme.colors.background },
          text: { primary: customTheme.colors.text },
          error: { main: customTheme.colors.error },
          info: { main: customTheme.colors.info },
          success: { main: customTheme.colors.success },
          warning: { main: customTheme.colors.warning },
        },
        components: {
          MuiTextField: {
            styleOverrides: {
              root: {
                "& .MuiOutlinedInput-root": {
                  // default
                  "& fieldset": {
                    borderColor: "var(--brand-primary-blue-600)",
                    borderWidth: 2,
                    borderRadius: 12,
                  },
                  // hover
                  "&:hover fieldset": {
                    borderColor: "var(--brand-primary-blue)",
                    borderWidth: 2,
                    borderRadius: 12,
                  },
                  // focused
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--brand-primary-blue)",
                    borderWidth: 3,
                  },
                },
              },
            },
          },
        },
      }),
    [],
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
