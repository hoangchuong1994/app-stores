import { APP_ROUTES } from '@/config/app-routes';
import type { AppRoute } from '@/config/app-routes';

export type UserRole = 'ADMIN' | 'MODERATOR' | 'USER';

export const ROLE_ROUTES: Record<UserRole, readonly AppRoute[]> = {
	ADMIN: [
		APP_ROUTES.ADMIN.ROOT,
		APP_ROUTES.ADMIN.USERS,
		APP_ROUTES.ADMIN.PRODUCTS,
	],
	MODERATOR: [APP_ROUTES.ADMIN.ROOT, APP_ROUTES.ADMIN.USERS],
	USER: [APP_ROUTES.DASHBOARD, APP_ROUTES.ACCOUNT.ROOT, APP_ROUTES.CART],
};
