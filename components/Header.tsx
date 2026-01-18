import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { auth } from '@/authentication/auth';
import { getTranslations } from 'next-intl/server';
import { ShoppingBag } from 'lucide-react';
import { ROUTES } from '@/config/routes';

export async function Header() {
	const session = await auth();
	const tNav = await getTranslations('header.nav');
	const tAc = await getTranslations('header.action');

	return (
		<header className="bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				{/* Logo */}
				<div className="flex items-center gap-2">
					<ShoppingBag className="h-5 w-5" />
					<span className="text-lg font-semibold tracking-tight">EcomSaaS</span>
				</div>

				{/* Navigation */}
				<nav className="hidden items-center gap-6 text-sm font-medium md:flex">
					<Link
						href={ROUTES.HOME}
						className="text-muted-foreground hover:text-foreground"
					>
						{tNav('shop')}
					</Link>
					<Link
						href={ROUTES.HOME}
						className="text-muted-foreground hover:text-foreground"
					>
						{tNav('categories')}
					</Link>
					<Link
						href={ROUTES.HOME}
						className="text-muted-foreground hover:text-foreground"
					>
						{tNav('deals')}
					</Link>
					<Link
						href={ROUTES.HOME}
						className="text-muted-foreground hover:text-foreground"
					>
						{tNav('about')}
					</Link>
				</nav>

				{/* Actions */}
				<div className="flex items-center gap-2">
					{!session ? (
						<>
							<Button variant="ghost" asChild>
								<Link href={ROUTES.AUTH.SIGN_IN}>{tAc('login')}</Link>
							</Button>
							<Button asChild>
								<Link href={ROUTES.AUTH.SIGN_UP}>{tAc('start')}</Link>
							</Button>
						</>
					) : (
						<Button asChild>
							<Link href={ROUTES.DASHBOARD}>Dashboard</Link>
						</Button>
					)}
				</div>
			</div>
		</header>
	);
}
