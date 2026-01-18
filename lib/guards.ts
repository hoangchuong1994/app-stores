// src/lib/middleware/guards.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/authentication/auth';
import { getPathname } from '@/i18n/navigation';
import type { AppRoute } from '@/config/routes';

export async function requireAuth(
	req: NextRequest,
	locale: string,
	redirectTo: AppRoute = '/auth/sign-in',
) {
	const session = await auth();

	if (!session) {
		const url = getPathname({
			locale,
			href: redirectTo,
		});

		return NextResponse.redirect(new URL(url, req.url));
	}

	return session;
}

export function forbid(
	req: NextRequest,
	locale: string,
	redirectTo: AppRoute = '/auth/error',
) {
	const url = getPathname({ locale, href: redirectTo });
	return NextResponse.redirect(new URL(url, req.url));
}
