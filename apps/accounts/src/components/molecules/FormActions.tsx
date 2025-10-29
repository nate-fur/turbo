"use client";

import { Button } from "@/components/atoms/Button";
import { Box } from "@mui/material";

interface Props {
  onSubmit: () => void;
  onCancel: () => void;
  disabled?: boolean;
}

export function FormActions({ onSubmit, onCancel, disabled = false }: Props) {
  return (
    <Box sx={{ display: "flex", gap: "20px", marginTop: "30px" }}>
      <Button
        variant="contained"
        sx={{ width: "100px", height: "30px" }}
        onClick={onSubmit}
        disabled={disabled}
      >
        Submit
      </Button>
      <Button sx={{ width: "100px", height: "30px" }} onClick={onCancel}>
        Cancel
      </Button>
    </Box>
  );
}
