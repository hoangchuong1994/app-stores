"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";

type RegisterValues = {
  name: string;
  email: string;
  password: string;
};

export function RegisterForm() {
  const t = useTranslations("auth.register");
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: RegisterValues) {
    try {
      setLoading(true);
      console.log(values);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-sm font-medium">{t("name.label")}</label>
        <Input
          className="h-11 rounded-xl"
          placeholder={t("name.placeholder")}
          {...form.register("name", { required: true })}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium">{t("email.label")}</label>
        <Input
          type="email"
          className="h-11 rounded-xl"
          placeholder={t("email.placeholder")}
          {...form.register("email", { required: true })}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium">{t("password.label")}</label>
        <Input
          type="password"
          className="h-11 rounded-xl"
          placeholder={t("password.placeholder")}
          {...form.register("password", { required: true })}
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="h-11 w-full rounded-xl text-base"
      >
        {loading ? t("loading") : t("submit")}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {t("haveAccount")}{" "}
        <Link
          href="/auth/sign-in"
          className="font-medium text-primary hover:underline"
        >
          {t("signIn")}
        </Link>
      </p>
    </form>
  );
}
