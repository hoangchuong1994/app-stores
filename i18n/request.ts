import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
	const requested = await requestLocale;

	const locale = hasLocale(routing.locales, requested)
		? requested
		: routing.defaultLocale;

	return {
		locale,
		messages: {
			auth: (await import(`@/i18n/messages/${locale}/auth.json`)).default,
			header: (await import(`@/i18n/messages/${locale}/header.json`)).default,
			cta: (await import(`@/i18n/messages/${locale}/cta.json`)).default,
			errors: (await import(`@/i18n/messages/${locale}/errors.json`)).default,
			common: (await import(`@/i18n/messages/${locale}/common.json`)).default,
			notFound: (await import(`@/i18n/messages/${locale}/notFound.json`))
				.default,
		},
	};
});
