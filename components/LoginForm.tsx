'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form';
import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { loginSchema, LoginFormValues } from '@/schema/login';
import { signIn } from 'next-auth/react';

export function LoginForm() {
	const t = useTranslations('auth.login');
	const locale = useLocale();
	const [loading, setLoading] = useState(false);

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	async function onSubmit(values: LoginFormValues) {
		try {
			setLoading(true);

			const res = await signIn('credentials', {
				email: values.email,
				password: values.password,
				redirect: false,
			});

			if (!res) return;

			if (res.error) {
				form.setError('email', {
					message: t('error.invalidCredentials'),
				});
				return;
			}

			// Login OK
			window.location.href = `/${locale}/dashboard`;
		} finally {
			setLoading(false);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
				{/* Email */}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t('email.label')}</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder={t('email.placeholder')}
									autoComplete="email"
									className="h-11 rounded-xl"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Password */}
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t('password.label')}</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder={t('password.placeholder')}
									autoComplete="current-password"
									className="h-11 rounded-xl"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Forgot password */}
				<div className="flex justify-end">
					<Link
						href="/auth/forgot-password"
						className="text-muted-foreground hover:text-foreground text-sm transition"
					>
						{t('forgotPassword')}
					</Link>
				</div>

				{/* Submit */}
				<Button
					type="submit"
					disabled={loading}
					className="h-11 w-full rounded-xl text-base"
				>
					{loading ? t('loading') : t('submit')}
				</Button>
			</form>
		</Form>
	);
}
