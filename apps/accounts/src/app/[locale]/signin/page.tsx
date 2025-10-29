"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import LoginLogo from "@/public/assets/images/loginLogo.png";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

import { useAuth } from "@acme/auth/client";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/";

  const t = useTranslations("SignIn");

  // Redirect to home if user is already authenticated
  useEffect(() => {
    if (!loading && user) {
      router.push(next);
    }
  }, [user, loading, router, next]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      router.push(next);
    } catch {
      setError(t("invalid_email"));
    }
  };

  // Show loading or nothing while checking authentication
  if (loading) {
    return null;
  }

  // Don't render signin form if user is authenticated
  if (user) {
    return null;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      p={3}
    >
      <Box sx={{ width: { xs: "45%", sm: "30%", md: "15%" }, mb: 2 }}>
        <Image
          src={LoginLogo}
          alt={t("login_logo")}
          width={150}
          height={150}
          style={{ width: "100%", height: "auto" }}
        />
      </Box>

      <Typography
        variant="h4"
        sx={{
          fontFamily: "crapFont",
          color: "var(--brand-primary-blue)",
          textTransform: "none",
        }}
      >
        {t("login_snowclub")}
      </Typography>

      <Box
        sx={{
          border: "3px solid rgba(113, 171, 184, 0.3)",
          borderRadius: 10,
          px: 5,
          py: 1,
          my: 2,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, width: "100%", maxWidth: 400 }}
        >
          {error && (
            <Typography color="error" variant="body2" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t("email")}
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ width: "100%" }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t("password")}
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ width: "100%" }}
          />
          <Typography
            sx={{
              textDecoration: "underline",
              textAlign: "right",
              color: "rgba(113, 171, 184, 1)",
            }}
          >
            {t("forgot_password")}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 1,
              mb: 2,
              px: 2,
              py: 2,
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
              borderRadius: 3,
            }}
          >
            {t("login")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
