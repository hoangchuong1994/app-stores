import { defineRouting } from 'next-intl/routing';
import { ROUTES } from '@/config/routes';

export const routing = defineRouting({
	locales: ['vi', 'en'],
	defaultLocale: 'vi',
	localePrefix: 'always',
	localeDetection: false,

	pathnames: {
		[ROUTES.HOME]: {
			vi: '/',
			en: '/',
		},

		[ROUTES.DASHBOARD]: {
			vi: '/bang-dieu-khien',
			en: '/dashboard',
		},

		[ROUTES.ADMIN.ROOT]: {
			vi: '/quan-tri',
			en: '/admin',
		},
		[ROUTES.ADMIN.USERS]: {
			vi: '/quan-tri/nguoi-dung',
			en: '/admin/users',
		},
		[ROUTES.ADMIN.PRODUCTS]: {
			vi: '/quan-tri/san-pham',
			en: '/admin/products',
		},

		[ROUTES.ACCOUNT.ROOT]: {
			vi: '/tai-khoan',
			en: '/account',
		},
		[ROUTES.ACCOUNT.PROFILE]: {
			vi: '/tai-khoan/ho-so',
			en: '/account/profile',
		},
		[ROUTES.ACCOUNT.SECURITY]: {
			vi: '/tai-khoan/bao-mat',
			en: '/account/security',
		},

		[ROUTES.CART]: {
			vi: '/gio-hang',
			en: '/cart',
		},

		[ROUTES.AUTH.SIGN_IN]: {
			vi: '/xac-thuc/dang-nhap',
			en: '/auth/sign-in',
		},
		[ROUTES.AUTH.SIGN_UP]: {
			vi: '/xac-thuc/dang-ky',
			en: '/auth/sign-up',
		},
		[ROUTES.AUTH.FORGOT_PASSWORD]: {
			vi: '/xac-thuc/quen-mat-khau',
			en: '/auth/forgot-password',
		},
		[ROUTES.AUTH.ERROR]: {
			vi: '/xac-thuc/loi',
			en: '/auth/error',
		},
		[ROUTES.AUTH.FORBIDDEN]: {
			vi: '/xac-thuc/403',
			en: '/auth/403',
		},
		[ROUTES.LEGAL.TERMS]: {
			vi: '/dieu-khoan',
			en: '/terms',
		},
		[ROUTES.LEGAL.PRIVACY]: {
			vi: '/chinh-sach-bao-mat',
			en: '/privacy',
		},
	},
});
