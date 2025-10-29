"use client";

import { Button } from "@/components/atoms/Button";
import { Typography } from "@/components/atoms/Typography";
import { Box } from "@mui/material";

interface Props {
  title: string;
  onEdit?: () => void;
  showEdit?: boolean;
}

export function ProfileSectionHeaders({
  title,
  onEdit,
  showEdit = true,
}: Props) {
  const headerBoxStyle = {
    width: "175px",
    height: "45px",
    background: "rgba(220, 31, 52, 0.05)",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const editButtonStyle = {
    fontWeight: 400,
    fontSize: "12px",
    textDecorationLine: "underline",
    color: "#2B96B9",
    textTransform: "none",
    minWidth: 0,
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Box sx={headerBoxStyle}>
        <Typography variant="h6" sx={{ color: "#828282", fontSize: "15px" }}>
          {title}
        </Typography>
      </Box>

      {showEdit && onEdit && (
        <Button onClick={onEdit} sx={editButtonStyle}>
          Edit
        </Button>
      )}
    </Box>
  );
}
