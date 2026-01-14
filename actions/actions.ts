"use server";

import { signIn } from "@/auth/auth";

export async function signInWithProvider(
  provider: "google" | "github",
  locale: string
) {
  await signIn(provider, {
    redirectTo: `/${locale}`,
  });
}
