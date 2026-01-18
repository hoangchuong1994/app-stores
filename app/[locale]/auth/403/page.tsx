'use client';

import { useTranslations, useLocale } from 'next-intl';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/config/routes';
import { Link } from '@/i18n/navigation';
import { signOutAction } from '@/actions/actions';

export default function ForbiddenPage() {
	const t = useTranslations('auth.errors.403');
	const locale = useLocale();

	return (
		<div className="flex flex-col items-center text-center">
			<div className="bg-destructive/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
				<ShieldAlert className="text-destructive h-6 w-6" />
			</div>

			<h1 className="text-lg font-semibold">{t('title')}</h1>

			<p className="text-muted-foreground mt-2 text-sm">{t('message')}</p>

			<div className="mt-6 flex w-full flex-col gap-2">
				<Button asChild>
					<Link href={ROUTES.DASHBOARD}>{t('backToDashboard')}</Link>
				</Button>

				<form action={signOutAction.bind(null, locale)}>
					<Button
						type="submit"
						variant="ghost"
						className="w-full hover:underline"
					>
						{t('switchAccount')}
					</Button>
				</form>
			</div>
		</div>
	);
}
