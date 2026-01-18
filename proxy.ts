import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { auth } from '@/auth/auth';
import { getPathname } from '@/i18n/navigation';

/* --------------------------------------------------
 * Types
 * -------------------------------------------------- */
type Locale = (typeof routing.locales)[number];

/* --------------------------------------------------
 * Locale helpers (NO any)
 * -------------------------------------------------- */
function isLocale(value: string): value is Locale {
	return routing.locales.includes(value as Locale);
}

function extractLocale(pathname: string): Locale {
	const [, first] = pathname.split('/');

	if (first && isLocale(first)) {
		return first;
	}

	return routing.defaultLocale;
}

function stripLocale(pathname: string): string {
	const [, first, ...rest] = pathname.split('/');

	if (first && isLocale(first)) {
		return `/${rest.join('/')}`;
	}

	return pathname;
}

/* --------------------------------------------------
 * next-intl proxy
 * -------------------------------------------------- */
const intlProxy = createMiddleware(routing);

/* --------------------------------------------------
 * PROXY middleware (GIỮ NGUYÊN KIẾN TRÚC)
 * -------------------------------------------------- */
export async function proxy(req: NextRequest) {
	const { pathname } = req.nextUrl;

	// 1️⃣ Bỏ qua Auth.js API
	if (pathname.startsWith('/api/auth')) {
		return NextResponse.next();
	}

	const locale = extractLocale(pathname);
	const pathWithoutLocale = stripLocale(pathname);

	// 2️⃣ Protect dashboard (đa locale)
	const dashboardPaths = Object.values(routing.pathnames['/dashboard']);

	if (dashboardPaths.some((p) => pathWithoutLocale.startsWith(p))) {
		const session = await auth();

		if (!session) {
			const signInPath = getPathname({
				locale,
				href: '/auth/sign-in',
			});

			return NextResponse.redirect(new URL(signInPath, req.url));
		}
	}

	// 3️⃣ Delegate cho next-intl
	return intlProxy(req);
}

/* --------------------------------------------------
 * Matcher
 * -------------------------------------------------- */
export const config = {
	matcher: [
		'/',
		'/(en|vi)/:path*',
		'/auth/:path*',
		'/dashboard/:path*',
		'/api/:path*',
	],
};
