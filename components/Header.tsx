import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { auth } from "@/auth/auth";
import { getTranslations } from "next-intl/server";

export async function Header() {
  const session = await auth();
  const tNav = await getTranslations("header.nav");
  const tAc = await getTranslations("header.action");

  return (
    <header className="w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="text-lg font-semibold">EcomSaaS</div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground">
            {tNav("features")}
          </a>
          <a href="#" className="hover:text-foreground">
            {tNav("solutions")}
          </a>
          <a href="#" className="hover:text-foreground">
            {tNav("pricing")}
          </a>
          <a href="#" className="hover:text-foreground">
            {tNav("docs")}
          </a>
        </nav>

        <div className="flex items-center gap-2">
          {!session ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/auth/sign-in">{tAc("login")}</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/sign-up">{tAc("start")}</Link>
              </Button>
            </>
          ) : (
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
