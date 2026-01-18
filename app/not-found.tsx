import Link from 'next/link';
import { ROUTES } from '@/config/routes';
import { useTranslations } from 'next-intl';

export default function NotFound() {
	const t = useTranslations('notFound');

	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<h2>{t('title')}</h2>
			<p>{t('description')}</p>
			<Link
				href={ROUTES.HOME}
				className="mt-4 rounded-md px-4 py-2 text-black dark:bg-slate-200"
			>
				{t('linkText')}
			</Link>
		</div>
	);
}
