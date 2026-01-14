import type { ReactNode } from "react";
import { AuthMotionWrapper } from "@/components/AuthMotionWrapper";

export default function AuthenticationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-muted/40 to-background">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex justify-center">
        <div className="mt-[-120px] h-[320px] w-[320px] rounded-full bg-primary/20 blur-[120px]" />
      </div>

      {/* Centered content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <AuthMotionWrapper>
          <div className="rounded-2xl border bg-background p-8 shadow-lg">
            {children}
          </div>
        </AuthMotionWrapper>
      </div>
    </main>
  );
}
