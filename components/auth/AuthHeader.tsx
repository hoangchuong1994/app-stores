import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/config/routes';
import { LogoIcon } from '../icons/AuthIcon';

type AuthHeaderProps = {
	title: string;
	description?: string;
};

export function AuthHeader({ title, description }: AuthHeaderProps) {
	return (
		<header className="mb-6 space-y-1 text-center">
			<Link
				href={ROUTES.HOME}
				className="mr-2 mb-2 flex items-center justify-center gap-2"
			>
				<LogoIcon className="h-10 w-10 text-fuchsia-500" />
				<span className="text-xl font-bold tracking-tight">
					Shop
					<span className="bg-linear-to-r from-fuchsia-500 to-violet-500 bg-clip-text text-transparent">
						zy
					</span>
				</span>
			</Link>
			<h1 className="text-2xl leading-tight font-semibold tracking-tight">
				{title}
			</h1>
			{description && (
				<p className="text-muted-foreground text-sm leading-relaxed">
					{description}
				</p>
			)}
		</header>
	);
}
