import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ROUTES } from '@/config/routes';
export default function NotFound() {
	const t = useTranslations('notFound');

	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<h2>{t('title')}</h2>
			<p>{t('description')}</p>
			<Link href={ROUTES.HOME}>{t('linkText')}</Link>
		</div>
	);
}
