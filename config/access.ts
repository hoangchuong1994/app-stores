import { ROUTES } from './routes';

/* ----------------------------------
 * Public routes (ai cũng vào được)
 * ---------------------------------- */
export const PUBLIC_ROUTES = [
	ROUTES.HOME,

	ROUTES.AUTH.SIGN_IN,
	ROUTES.AUTH.SIGN_UP,
	ROUTES.AUTH.FORGOT_PASSWORD,
	ROUTES.AUTH.ERROR,

	ROUTES.LEGAL.TERMS,
	ROUTES.LEGAL.PRIVACY,
] as const;

/* ----------------------------------
 * Protected routes (chỉ cần login)
 * ---------------------------------- */
export const PROTECTED_ROUTES = [
	ROUTES.DASHBOARD,

	ROUTES.ACCOUNT.ROOT,
	ROUTES.ACCOUNT.PROFILE,
	ROUTES.ACCOUNT.SECURITY,

	ROUTES.CART,
] as const;

/* ----------------------------------
 * Admin routes (cần permission)
 * ---------------------------------- */
export const ADMIN_ROUTES = {
	[ROUTES.ADMIN.ROOT]: ['admin.access'],
	[ROUTES.ADMIN.USERS]: ['user.read', 'user.write'],
	[ROUTES.ADMIN.PRODUCTS]: ['product.read', 'product.write'],
} as const;
