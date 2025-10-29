"use client";

import type { FormErrors } from "@/components/forms/ProfileForm.types";
import { Button } from "@/components/atoms/Button";
import { TextField } from "@/components/atoms/TextField";
import { Typography } from "@/components/atoms/Typography";
import { Box } from "@mui/material";

import { FormActions } from "./FormActions";
import { ProfileSectionHeaders } from "./ProfileSectionHeader";

type Props = {
  formData: Record<string, string>;
  errors: FormErrors;
  isEditing: boolean;
  isPasswordEditing: boolean;
  onChange: (key: string, value: string) => void;
  onEdit: () => void;
  onPasswordEdit: () => void;
  onSubmit: () => void;
  onCancel: () => void;
};

export function AccountInformation({
  formData,
  errors,
  isEditing,
  isPasswordEditing,
  onChange,
  onEdit,
  onPasswordEdit,
  onSubmit,
  onCancel,
}: Props) {
  return (
    <Box sx={{ marginBottom: "50px" }}>
      {/* Header */}
      <ProfileSectionHeaders
        title="Account Information"
        onEdit={onEdit}
        showEdit={!isEditing}
      />

      {/* Email & Password */}
      <Box
        sx={{
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "flex-start",
        }}
      >
        {!isEditing ? (
          <Typography>{formData.email}</Typography>
        ) : (
          <TextField
            label="Email"
            required
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
        )}

        {!isPasswordEditing ? (
          <Button
            onClick={onPasswordEdit}
            sx={{
              fontWeight: 500,
              fontSize: "11px",
              textDecorationLine: "underline",
              color: "#4D4D4D",
              padding: 0,
              minWidth: 0,
            }}
          >
            Change Password
          </Button>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Current Password"
              type="password"
              value={formData.currentPassword}
              onChange={(e) => onChange("currentPassword", e.target.value)}
              error={!!errors.currentPassword}
              helperText={errors.currentPassword}
              fullWidth
            />
            <TextField
              label="New Password"
              type="password"
              value={formData.password}
              onChange={(e) => onChange("password", e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
            />
            <TextField
              label="Confirm New Password"
              type="password"
              value={formData.passwordConfirmation}
              onChange={(e) => onChange("passwordConfirmation", e.target.value)}
              error={!!errors.passwordConfirmation}
              helperText={errors.passwordConfirmation}
              fullWidth
            />
          </Box>
        )}
      </Box>

      {/* Submit & Cancel */}
      {(isEditing || isPasswordEditing) && (
        <FormActions onSubmit={onSubmit} onCancel={onCancel} />
      )}
    </Box>
  );
}
