// src/config/routes.ts

export const ROUTES = {
	HOME: '/',
	DASHBOARD: '/dashboard',

	ADMIN: {
		ROOT: '/admin',
		USERS: '/admin/users',
		PRODUCTS: '/admin/products',
	},

	ACCOUNT: {
		ROOT: '/account',
		PROFILE: '/account/profile',
		SECURITY: '/account/security',
	},

	CART: '/cart',

	AUTH: {
		SIGN_IN: '/auth/sign-in',
		SIGN_UP: '/auth/sign-up',
		FORGOT_PASSWORD: '/auth/forgot-password',
		ERROR: '/auth/error',
		FORBIDDEN: '/auth/403',
	},

	LEGAL: {
		TERMS: '/terms',
		PRIVACY: '/privacy',
	},
} as const;

/* ----------------------------------
 * Type helpers
 * ---------------------------------- */
type ValueOf<T> = T[keyof T];

type DeepRoute<T> = T extends string
	? T
	: T extends Record<string, unknown>
		? DeepRoute<ValueOf<T>>
		: never;

/* ----------------------------------
 * AppRoute = union of all leaf routes
 * ---------------------------------- */
export type AppRoute = DeepRoute<typeof ROUTES>;
