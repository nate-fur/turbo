import type { LocalePrefixMode } from "next-intl/routing";

const localePrefix: LocalePrefixMode = "as-needed";

// FIXME: Update this configuration file based on your project information
export const AppConfig = {
  name: "SnowBus New",
  locales: ["en", "fr"],
  defaultLocale: "en",
  localePrefix,
};
