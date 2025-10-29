"use client";

import type { FormErrors } from "@/components/forms/ProfileForm.types";
import { DatePickerField } from "@/components/atoms/DatePicker";
import { TextField } from "@/components/atoms/TextField";
import { Typography } from "@/components/atoms/Typography";
import { Box } from "@mui/material";

import { FormActions } from "./FormActions";
import { ProfileSectionHeaders } from "./ProfileSectionHeader";

interface Props {
  formData: Record<string, string>;
  errors: FormErrors;
  isEditing: boolean;
  onChange: (key: string, value: string) => void;
  onEdit: () => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export function ProfileInformation({
  formData,
  errors,
  isEditing,
  onChange,
  onEdit,
  onSubmit,
  onCancel,
}: Props) {
  return (
    <Box>
      {/* Header */}
      <ProfileSectionHeaders
        title="Profile Information"
        onEdit={onEdit}
        showEdit={!isEditing}
      />

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
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography sx={{ display: "flex" }}>
              <strong style={{ width: 120 }}>First Name:</strong>{" "}
              {formData.firstName}
            </Typography>
            <Typography sx={{ display: "flex" }}>
              <strong style={{ width: 120 }}>Last Name:</strong>{" "}
              {formData.lastName}
            </Typography>
            <Typography sx={{ display: "flex" }}>
              <strong style={{ width: 120 }}>DOB:</strong> {formData.dob}
            </Typography>
            <Typography sx={{ display: "flex" }}>
              <strong style={{ width: 120 }}>Phone:</strong> {formData.phone}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <TextField
              label="First Name"
              value={formData.firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <TextField
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
            <DatePickerField
              label="Date of Birth"
              value={formData.dob}
              onChange={(value) => onChange("dob", value || "")}
              error={!!errors.dob}
              helperText={errors.dob}
              disableFuture
            />
            <TextField
              label="Phone"
              value={formData.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              error={!!errors.phone}
              helperText={errors.phone}
            />

            {/* Submit & Cancel */}
            <FormActions onSubmit={onSubmit} onCancel={onCancel} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
