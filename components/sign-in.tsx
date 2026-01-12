import { signIn } from "@/auth/auth";
import { useLocale } from "next-intl";

export default function SignIn() {
  const locale = useLocale();
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", {
          callbackUrl: "/",
          redirectTo: `/${locale}/dashboard`,
        });
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  );
}
