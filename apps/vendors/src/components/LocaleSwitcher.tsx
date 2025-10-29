"use client";

import type { ThemeType } from "@/providers/Theme";
import { useRouter } from "next/navigation";
import { usePathname } from "@/libs/I18nNavigation";
import { routing } from "@/libs/I18nRouting";
import LanguageIcon from "@mui/icons-material/Language";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useLocale } from "next-intl";

interface Props {
  theme?: ThemeType;
  sx?: object;
  size?: "small" | "medium" | "large";
}

export const LocaleSwitcher = ({ sx, size = "small", theme }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newLocale: string | null,
  ) => {
    if (newLocale && newLocale !== locale) {
      router.push(`/${newLocale}${pathname}`);
      router.refresh(); // Ensure the page takes the new locale into account related to the issue #395
    }
  };

  return (
    <ToggleButtonGroup
      value={locale}
      exclusive
      onChange={handleChange}
      aria-label="language switcher"
      size={size}
      color="primary"
      sx={{
        "& .MuiToggleButton-root": {
          border: "1px solid rgba(255, 255, 255, 0.3)",
          color: theme?.colors.primary,
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
          "&.Mui-selected": {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: theme?.colors.text,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.3)",
            },
          },
        },
        ...sx,
      }}
    >
      {routing.locales.map((elt) => (
        <ToggleButton
          key={elt}
          value={elt}
          aria-label={`Switch to ${elt.toUpperCase()}`}
          sx={{
            minWidth: 40,
            fontWeight: 600,
            fontSize: "0.75rem",
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          {elt === locale && <LanguageIcon sx={{ fontSize: 16 }} />}
          {elt.toUpperCase()}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
