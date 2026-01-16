import { Link } from "@/i18n/navigation";
import { LogoIcon } from "../icons/AuthIcon";

type AuthHeaderProps = {
  title: string;
  description?: string;
};

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <header className="mb-6 text-center">
      <Link
        href="/"
        className="flex items-center justify-center gap-2 mb-2 mr-2"
      >
        <LogoIcon className="h-10 w-10 text-fuchsia-500" />
        <span className="text-xl font-bold tracking-tight">
          Shop<span className="text-primary">zy</span>
        </span>
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
    </header>
  );
}
