import { Card, CardContent } from "@/components/ui/card";
import type { ReactNode } from "react";

type AuthCardProps = {
  children: ReactNode;
};

export function AuthCard({ children }: AuthCardProps) {
  return (
    <Card className="w-full max-w-md rounded-2xl border shadow-xl py-2">
      <CardContent className="p-8">
        <div className="space-y-6">{children}</div>
      </CardContent>
    </Card>
  );
}
