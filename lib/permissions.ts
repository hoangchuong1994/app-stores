import { APP_ROUTES } from '@/config/app-routes';

export const PERMISSIONS = {
	MANAGE_USERS: ['user.read', 'user.write'],
	MANAGE_PRODUCTS: ['product.read', 'product.write'],
} as const;

export const ROUTE_PERMISSIONS = {
	[APP_ROUTES.ADMIN.USERS]: PERMISSIONS.MANAGE_USERS,
	[APP_ROUTES.ADMIN.PRODUCTS]: PERMISSIONS.MANAGE_PRODUCTS,
} as const;
