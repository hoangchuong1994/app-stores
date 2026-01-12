import Link from "next/link";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2>{t("title")}</h2>
      <p>{t("description")}</p>
      <Link href="/">{t("linkText")}</Link>
    </div>
  );
}
