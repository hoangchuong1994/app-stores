import { signIn } from "@/auth/auth";
import { useLocale, useTranslations } from "next-intl";

export default function Home() {
  const locale = useLocale();
  const t = useTranslations("text-login");
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <form
          action={async () => {
            "use server";
            await signIn("google", {
              callbackUrl: "/",
              redirectTo: `/${locale}/dashboard`,
            });
          }}
        >
          <button type="submit">{t("btnText")}</button>
        </form>
      </main>
    </div>
  );
}
