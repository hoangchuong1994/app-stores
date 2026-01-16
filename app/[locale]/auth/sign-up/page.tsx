import { getTranslations } from "next-intl/server";
import { RegisterForm } from "@/components/RegisterForm";
import { OAuthButtons } from "@/components/OAuthButtons";
import { Divider } from "@/components/Divider";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthFooter } from "@/components/auth/AuthFooter";

export default async function RegisterPage() {
  const t = await getTranslations("auth.register");

  return (
    <>
      <AuthHeader title={t("title")} description={t("description")} />
      <OAuthButtons />
      <Divider text={t("divider")} />
      <RegisterForm />
      <AuthFooter
        text={t("haveAccount")}
        linkText={t("signIn")}
        href="/auth/sign-in"
      />
    </>
  );
}
