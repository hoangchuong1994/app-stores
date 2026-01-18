import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
	locales: ['vi', 'en'],
	defaultLocale: 'vi',
	localePrefix: 'always',
	localeDetection: false,
	pathnames: {
		'/': {
			vi: '/',
			en: '/',
		},
		'/home': {
			vi: '/trang-chu',
			en: '/home',
		},
		'/dashboard': {
			vi: '/bang-dieu-khien',
			en: '/dashboard',
		},
		'/auth/sign-in': {
			vi: '/xac-thuc/dang-nhap',
			en: '/auth/sign-in',
		},
		'/auth/sign-up': {
			vi: '/xac-thuc/dang-ky',
			en: '/auth/sign-up',
		},
		'/auth/forgot-password': {
			vi: '/xac-thuc/quen-mat-khau',
			en: '/auth/forgot-password',
		},
		'/auth/error': {
			vi: '/xac-thuc/loi',
			en: '/auth/error',
		},
		'/terms': {
			vi: '/dieu-khoan',
			en: '/terms',
		},
		'/privacy': {
			vi: '/chinh-sach-bao-mat',
			en: '/privacy',
		},
	},
});
