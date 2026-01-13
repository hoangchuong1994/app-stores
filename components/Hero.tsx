"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="container mx-auto px-4 py-24 text-center">
      <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
        {t("title")}
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
        {t("description")}
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <Button size="lg">{t("cta.start")}</Button>
        <Button size="lg" variant="outline">
          {t("cta.demo")}
        </Button>
      </div>
    </section>
  );
}
