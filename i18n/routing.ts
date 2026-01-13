import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["vi", "en"],
  defaultLocale: "vi",
  localePrefix: "always",
  localeDetection: false,
  pathnames: {
    "/": {
      vi: "/",
      en: "/",
    },
    "/home": {
      vi: "/trang-chu",
      en: "/home",
    },
    "/dashboard": {
      vi: "/bang-dieu-khien",
      en: "/dashboard",
    },
    "/login": {
      vi: "/dang-nhap",
      en: "/login",
    },
  },
});
