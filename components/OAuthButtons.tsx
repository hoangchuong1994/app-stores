'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { GoogleIcon } from '@/components/icons/GoogleIcon';

import { springButton } from '@/lib/motion/button';
import { useSafeMotion } from '@/hooks/use-safe-motion';

import { signInWithProvider } from '@/actions/actions';

const MotionButton = motion.create(Button);

type Provider = {
	id: 'google' | 'github';
	Icon: React.ComponentType<{ className?: string }>;
};

const PROVIDERS: Provider[] = [
	{ id: 'google', Icon: GoogleIcon },
	// { id: "github", Icon: GithubIcon },
];

export function OAuthButtons() {
	const t = useTranslations('auth.oauth');
	const locale = useLocale();
	const motionProps = useSafeMotion(springButton);

	return (
		<div className="grid gap-3">
			{PROVIDERS.map(({ id, Icon }) => (
				<form key={id} action={signInWithProvider.bind(null, id, locale)}>
					<MotionButton
						{...motionProps}
						type="submit"
						variant="outline"
						className="flex h-11 w-full items-center justify-center gap-3 rounded-xl"
					>
						<Icon className="h-4 w-4" />
						{t(id)}
					</MotionButton>
				</form>
			))}
		</div>
	);
}
