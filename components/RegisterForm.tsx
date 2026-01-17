'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RegisterValues, registerSchema } from '@/schema/register';

export function RegisterForm() {
	const t = useTranslations('auth.register');
	const [loading, setLoading] = useState(false);

	const form = useForm<RegisterValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	async function onSubmit(values: RegisterValues) {
		try {
			setLoading(true);
			console.log(values);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
				{/* Name */}
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t('name.label')}</FormLabel>
							<FormControl>
								<Input
									autoComplete="name"
									placeholder={t('name.placeholder')}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Email */}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t('email.label')}</FormLabel>
							<FormControl>
								<Input
									autoComplete="email"
									type="email"
									placeholder={t('email.placeholder')}
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
									autoComplete="current-password"
									type="password"
									placeholder={t('password.placeholder')}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

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
