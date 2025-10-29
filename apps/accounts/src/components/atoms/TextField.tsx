"use client";

import type { TextFieldProps } from "@mui/material";
import { TextField as MUITextField } from "@mui/material";

export function TextField(props: TextFieldProps) {
  return (
    <MUITextField
      {...props}
      variant="outlined"
      size="small"
      sx={{
        width: "372px",
        ...props.sx,
      }}
    />
  );
}
