import { getTranslations } from "next-intl/server";
import { LoginForm } from "@/components/LoginForm";

export default async function LoginPage() {
  const t = await getTranslations("auth.login");

  return (
    <>
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("description")}</p>
      </header>

      {/* <LoginForm /> */}
    </>
  );
}
