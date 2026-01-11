import { signIn } from "@/auth/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { callbackUrl: "/", redirectTo: "/dashboard" });
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  );
}
