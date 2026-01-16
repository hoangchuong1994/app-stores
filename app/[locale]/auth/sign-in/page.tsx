import { getTranslations } from "next-intl/server";
import { LoginForm } from "@/components/LoginForm";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthFooter } from "@/components/auth/AuthFooter";

export default async function LoginPage() {
  const t = await getTranslations("auth.login");

  return (
    <>
      <AuthHeader title={t("title")} description={t("description")} />
      <LoginForm />
      <AuthFooter
        text={t("noAccount")}
        linkText={t("signUp")}
        href="/auth/sign-up"
      />
    </>
  );
}
