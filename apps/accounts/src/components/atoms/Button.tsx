"use client";

import type { ButtonProps } from "@mui/material";
import { Button as MUIButton } from "@mui/material";

export function Button(props: ButtonProps) {
  return (
    <MUIButton
      {...props}
      sx={{
        textTransform: "none",
        borderRadius: "6px",
        ...props.sx,
      }}
    />
  );
}
