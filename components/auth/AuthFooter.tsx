import type { ComponentProps } from 'react';
import { ROUTES } from '@/config/routes';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

type AuthFooterProps = {
	text: string;
	linkText: string;
	href: ComponentProps<typeof Link>['href'];
};

export function AuthFooter({ text, linkText, href }: AuthFooterProps) {
	const t = useTranslations('auth.agreement');

	return (
		<footer className="mt-8 space-y-3 text-center text-sm">
			<p className="text-muted-foreground">
				{text}
				<Link
					href={href}
					className="text-primary font-medium underline-offset-4 hover:underline"
				>
					{linkText}
				</Link>
			</p>

			<p className="text-muted-foreground text-xs">
				{t('prefix')}
				<Link
					href={ROUTES.LEGAL.TERMS}
					className="underline underline-offset-2"
				>
					{t('terms')}
				</Link>
				{t('and')}
				<Link
					href={ROUTES.LEGAL.PRIVACY}
					className="underline underline-offset-2"
				>
					{t('privacy')}
				</Link>
				.
			</p>
		</footer>
	);
}
