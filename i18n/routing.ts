import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "vi"],
  defaultLocale: "en",
  pathnames: {
    "/": {
      en: "/",
      vi: "/",
    },
    "/home": {
      en: "/home",
      vi: "/trang-chu",
    },
    "/dashboard": {
      en: "/dashboard",
      vi: "/bang-dieu-khien",
    },
    "/login": {
      en: "/login",
      vi: "/dang-nhap",
    },
  },
});
