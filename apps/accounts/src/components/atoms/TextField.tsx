"use client";

import { TextField as MUITextField, TextFieldProps } from "@mui/material";

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
