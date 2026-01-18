'use server';

import { signIn, signOut } from '@/authentication/auth';

export async function signInWithProvider(
	provider: 'google' | 'github',
	locale: string,
) {
	await signIn(provider, {
		redirectTo: `/${locale}`,
		prompt: 'select_account',
	});
}

export async function signOutAction(locale: string) {
	await signOut({
		redirectTo: `/${locale}/auth/sign-in`,
	});
}
