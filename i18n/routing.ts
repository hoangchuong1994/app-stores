import { defineRouting } from 'next-intl/routing';
import { APP_ROUTES } from '@/config/app-routes';

export const routing = defineRouting({
	locales: ['vi', 'en'],
	defaultLocale: 'vi',
	localePrefix: 'always',
	localeDetection: false,

	pathnames: {
		[APP_ROUTES.HOME]: {
			vi: '/',
			en: '/',
		},

		[APP_ROUTES.DASHBOARD]: {
			vi: '/bang-dieu-khien',
			en: '/dashboard',
		},

		[APP_ROUTES.ADMIN.ROOT]: {
			vi: '/quan-tri',
			en: '/admin',
		},
		[APP_ROUTES.ADMIN.USERS]: {
			vi: '/quan-tri/nguoi-dung',
			en: '/admin/users',
		},
		[APP_ROUTES.ADMIN.PRODUCTS]: {
			vi: '/quan-tri/san-pham',
			en: '/admin/products',
		},

		[APP_ROUTES.ACCOUNT.ROOT]: {
			vi: '/tai-khoan',
			en: '/account',
		},
		[APP_ROUTES.ACCOUNT.PROFILE]: {
			vi: '/tai-khoan/ho-so',
			en: '/account/profile',
		},
		[APP_ROUTES.ACCOUNT.SECURITY]: {
			vi: '/tai-khoan/bao-mat',
			en: '/account/security',
		},

		[APP_ROUTES.CART]: {
			vi: '/gio-hang',
			en: '/cart',
		},

		[APP_ROUTES.AUTH.SIGN_IN]: {
			vi: '/xac-thuc/dang-nhap',
			en: '/auth/sign-in',
		},
		[APP_ROUTES.AUTH.SIGN_UP]: {
			vi: '/xac-thuc/dang-ky',
			en: '/auth/sign-up',
		},
		[APP_ROUTES.AUTH.FORGOT_PASSWORD]: {
			vi: '/xac-thuc/quen-mat-khau',
			en: '/auth/forgot-password',
		},
		[APP_ROUTES.AUTH.ERROR]: {
			vi: '/xac-thuc/loi',
			en: '/auth/error',
		},
		[APP_ROUTES.AUTH.FORBIDDEN]: {
			vi: '/xac-thuc/cam-truy-cap',
			en: '/auth/forbidden',
		},
		[APP_ROUTES.LEGAL.TERMS]: {
			vi: '/dieu-khoan',
			en: '/terms',
		},
		[APP_ROUTES.LEGAL.PRIVACY]: {
			vi: '/chinh-sach-bao-mat',
			en: '/privacy',
		},
	},
});
