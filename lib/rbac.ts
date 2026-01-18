import { ROUTES } from '@/config/routes';
import type { AppRoute } from '@/config/routes';

export type UserRole = 'ADMIN' | 'MODERATOR' | 'USER';

export const ROLE_ROUTES: Record<UserRole, readonly AppRoute[]> = {
	ADMIN: [ROUTES.ADMIN.ROOT, ROUTES.ADMIN.USERS, ROUTES.ADMIN.PRODUCTS],
	MODERATOR: [ROUTES.ADMIN.ROOT, ROUTES.ADMIN.USERS],
	USER: [ROUTES.DASHBOARD, ROUTES.ACCOUNT.ROOT, ROUTES.CART],
};
