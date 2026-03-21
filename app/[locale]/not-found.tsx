import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { APP_ROUTES } from '@/config/app-routes';
export default function NotFound() {
	const t = useTranslations('notFound');

	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<h2>{t('title')}</h2>
			<p>{t('description')}</p>
			<Link href={APP_ROUTES.HOME}>{t('linkText')}</Link>
		</div>
	);
}
