import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { auth } from '@/authentication/auth';
import { getPathname } from '@/i18n/navigation';
import { ROUTES } from '@/config/routes';
import { ADMIN_ROUTES } from '@/config/access';

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
		const stripped = `/${rest.join('/')}`;
		return stripped === '' ? '/' : stripped;
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

	const protectedPathnames = [
		...Object.values(routing.pathnames[ROUTES.DASHBOARD]),
		...Object.values(routing.pathnames[ROUTES.ADMIN.ROOT]),
		...Object.values(routing.pathnames[ROUTES.ACCOUNT.ROOT]),
	];

	// 2️⃣ Protect dashboard (đa locale, type-safe)
	if (protectedPathnames.some((p) => pathWithoutLocale.startsWith(p))) {
		const session = await auth();

		if (!session) {
			const signInPath = getPathname({
				locale,
				href: ROUTES.AUTH.SIGN_IN,
			});

			return NextResponse.redirect(new URL(signInPath, req.url));
		}

		/* --------------------------------------------------
		 * 3️⃣ AUTHORIZATION (RBAC – permission based)
		 * -------------------------------------------------- */
		for (const [routeKey, requiredPermissions] of Object.entries(
			ADMIN_ROUTES,
		)) {
			const localizedPaths =
				routing.pathnames[routeKey as keyof typeof routing.pathnames];

			if (!localizedPaths) continue;

			const isMatch = Object.values(localizedPaths).some((p) =>
				pathWithoutLocale.startsWith(p),
			);

			if (!isMatch) continue;

			const userPermissions = session.user.permissions ?? [];

			const hasPermission = requiredPermissions.some((permission) =>
				userPermissions.includes(permission),
			);

			if (!hasPermission) {
				return NextResponse.redirect(
					new URL(getPathname({ locale, href: ROUTES.AUTH.ERROR }), req.url),
				);
			}
		}
	}

	// 3️⃣ Delegate cho next-intl
	return intlProxy(req);
}

/* --------------------------------------------------
 * Matcher (tối ưu, không chạy dư)
 * -------------------------------------------------- */
export const config = {
	matcher: ['/', '/(vi|en)/:path*', '/api/:path*'],
};
