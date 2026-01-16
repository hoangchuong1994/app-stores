import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import type { ComponentProps } from "react";

type AuthFooterProps = {
  text: string;
  linkText: string;
  href: ComponentProps<typeof Link>["href"];
};

export function AuthFooter({ text, linkText, href }: AuthFooterProps) {
  const t = useTranslations("auth.agreement");

  return (
    <footer className="mt-6 space-y-4 text-center text-sm">
      <p className="text-muted-foreground">
        {text}
        <Link href={href} className="font-medium text-primary hover:underline">
          {linkText}
        </Link>
      </p>

      <p className="text-xs text-muted-foreground">
        {t("prefix")}
        <Link href="/terms" className="underline underline-offset-2">
          {t("terms")}
        </Link>
        {t("and")}
        <Link href="/privacy" className="underline underline-offset-2">
          {t("privacy")}
        </Link>
        .
      </p>
    </footer>
  );
}
