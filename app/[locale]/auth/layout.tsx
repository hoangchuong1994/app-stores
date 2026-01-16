import type { ReactNode } from "react";
import { AuthMotionWrapper } from "@/components/AuthMotionWrapper";
import { AuthCard } from "@/components/auth/AuthCard";

export default function AuthenticationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen overflow-hidden bg-linear-to-br from-background via-primary/5 to-muted/60 bg-slate-200">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex justify-center"
      >
        <div className="-mt-30 h-60 w-60 sm:h-80 sm:w-80 rounded-full bg-primary/35 dark:bg-primary/25 blur-[140px]" />
      </div>

      <section
        aria-label="Authentication"
        className="relative z-10 flex flex-1 items-center justify-center px-4"
      >
        <AuthMotionWrapper>
          <AuthCard>{children}</AuthCard>
        </AuthMotionWrapper>
      </section>
    </main>
  );
}
