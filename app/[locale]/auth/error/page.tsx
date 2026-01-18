'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

import { Button } from '@/components/ui/button';
import { ROUTES } from '@/config/routes';

export default function AuthErrorPage() {
	const params = useSearchParams();
	const error = params.get('error') ?? 'Unknown';
	const t = useTranslations('auth.errors');

	return (
		<div className="space-y-6 text-center">
			<div className="space-y-2">
				<h1 className="text-xl font-semibold">{t('title')}</h1>
				<p className="text-muted-foreground text-sm">{t('subtitle')}</p>
			</div>

			<p className="text-muted-foreground text-sm">{t(error)}</p>

			<Button asChild className="w-full">
				<Link href={ROUTES.AUTH.SIGN_IN}>{t('backToLogin')}</Link>
			</Button>
		</div>
	);
}
