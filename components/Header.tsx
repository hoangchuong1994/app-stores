import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { auth } from "@/auth/auth";

export async function Header() {
  const session = await auth();
  return (
    <header className="w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="text-lg font-semibold">EcomSaaS</div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground">
            Tính năng
          </a>
          <a href="#" className="hover:text-foreground">
            Giải pháp
          </a>
          <a href="#" className="hover:text-foreground">
            Giá
          </a>
          <a href="#" className="hover:text-foreground">
            Tài liệu
          </a>
        </nav>

        <div className="flex items-center gap-2">
          {!session ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/auth/sign-in">Đăng nhập</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/sign-up">Bắt đầu</Link>
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
