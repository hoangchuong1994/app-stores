import Link from "next/link";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2>{t("title")}</h2>
      <p>{t("description")}</p>
      <Link
        href="/"
        className="mt-4 dark:bg-slate-200 text-black px-4 py-2 rounded-md"
      >
        {t("linkText")}
      </Link>
    </div>
  );
}
