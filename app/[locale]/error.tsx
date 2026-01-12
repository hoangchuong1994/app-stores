"use client";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const t = useTranslations("error");
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2>{t("title")}</h2>
      <p>{t("description")}</p>
      <button onClick={() => reset()}>{t("btnText")}</button>
    </div>
  );
}
