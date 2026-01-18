import { notFound } from 'next/navigation';
import { auth } from '@/auth/auth';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Providers } from '@/app/[locale]/providers';

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const session = await auth();
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) notFound();
	setRequestLocale(locale);

	return (
		<NextIntlClientProvider locale={locale}>
			<Providers session={session}>{children}</Providers>
		</NextIntlClientProvider>
	);
}
