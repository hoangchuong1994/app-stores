import { getTranslations } from "next-intl/server";
import { RegisterForm } from "@/components/RegisterForm";
import { OAuthButtons } from "@/components/OAuthButtons";
import { Divider } from "@/components/Divider";

export default async function RegisterPage() {
  const t = await getTranslations("auth.register");

  return (
    <>
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("description")}</p>
      </header>

      <OAuthButtons />

      <Divider text={t("divider")} />

      <RegisterForm />
    </>
  );
}
