"use client";

import { useState } from "react";
import { AccountInformation } from "@/components/molecules/AccountInformation";
import { ProfileInformation } from "@/components/molecules/ProfileInformation";
import { Box } from "@mui/material";
import { useTranslations } from "next-intl";

import { useAuth } from "@acme/auth/client";

import type { FormErrors } from "./ProfileForm.types";

// type Props = {
//   locale: string;
// };

export function ProfileForm() {
  const { user } = useAuth();
  const t = useTranslations("ProfilePage");

  const [accountEditing, setAccountEditing] = useState(false);
  const [passwordEditing, setPasswordEditing] = useState(false);
  const [profileEditing, setProfileEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.personal?.firstName || "",
    lastName: user?.personal?.lastName || "",
    dob: user?.personal?.dob || "",
    phone: user?.personal?.phone || "",
    email: user?.email || "",
    currentPassword: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) => password.length >= 6;

  const handleAccountSubmit = async () => {
    // console.log('Validating form data:', process.env.NEXT_PUBLIC_API_URL);
    const newErrors: FormErrors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = t("invalid_email");
    }
    if (passwordEditing) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = t("invalid_current_password");
      }
      if (!formData.password) {
        newErrors.password = t("invalid_new_password");
      }
      if (!validatePassword(formData.password)) {
        newErrors.password = t("invalid_password_length");
      }
      if (formData.password !== formData.passwordConfirmation) {
        newErrors.passwordConfirmation = t("invalid_password_match");
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.warn("Account updated", formData);
      setAccountEditing(false);
      setPasswordEditing(false);
    }
  };

  const handleProfileSubmit = () => {
    const newErrors: FormErrors = {};
    if (!formData.firstName) {
      newErrors.firstName = t("invalid_first_name");
    }
    if (!formData.lastName) {
      newErrors.lastName = t("invalid_last_name");
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.warn("Profile updated", formData);
      setProfileEditing(false);
    }
  };

  return (
    <Box sx={{ padding: "35px 0 0 0px" }}>
      <AccountInformation
        formData={formData}
        errors={errors}
        isEditing={accountEditing}
        isPasswordEditing={passwordEditing}
        onChange={(k, v) => setFormData({ ...formData, [k]: v })}
        onEdit={() => setAccountEditing(true)}
        onPasswordEdit={() => setPasswordEditing(true)}
        onSubmit={handleAccountSubmit}
        onCancel={() => {
          setAccountEditing(false);
          setPasswordEditing(false);
        }}
      />

      <ProfileInformation
        formData={formData}
        errors={errors}
        isEditing={profileEditing}
        onChange={(k, v) => setFormData({ ...formData, [k]: v })}
        onEdit={() => setProfileEditing(true)}
        onSubmit={handleProfileSubmit}
        onCancel={() => setProfileEditing(false)}
      />
    </Box>
  );
}
