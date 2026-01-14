"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";

type LoginFormValues = {
  email: string;
  password: string;
};

export function LoginForm() {
  const t = useTranslations("auth.login");
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    try {
      setLoading(true);
      console.log(values);
      // TODO: gọi auth / server action
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      {/* Email */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium">{t("email.label")}</label>
        <Input
          type="email"
          placeholder={t("email.placeholder")}
          className="h-11 rounded-xl"
          {...form.register("email", { required: true })}
        />
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium">{t("password.label")}</label>
        <Input
          type="password"
          placeholder={t("password.placeholder")}
          className="h-11 rounded-xl"
          {...form.register("password", { required: true })}
        />
      </div>

      {/* Forgot password */}
      <div className="flex justify-end">
        <Link
          href="/auth/forgot-password"
          className="text-sm text-muted-foreground transition hover:text-foreground"
        >
          {t("forgotPassword")}
        </Link>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading}
        className="h-11 w-full rounded-xl text-base"
      >
        {loading ? t("loading") : t("submit")}
      </Button>

      {/* Footer */}
      <p className="pt-2 text-center text-sm text-muted-foreground">
        {t("noAccount")}{" "}
        <Link
          href="/auth/sign-up"
          className="font-medium text-primary hover:underline"
        >
          {t("signUp")}
        </Link>
      </p>
    </form>
  );
}
