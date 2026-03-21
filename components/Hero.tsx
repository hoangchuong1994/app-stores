'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function Hero() {
	const t = useTranslations('common.hero');

	return (
		<section className="relative flex min-h-screen items-center justify-center overflow-hidden">
			<div
				className="absolute inset-0 bg-cover bg-center bg-no-repeat"
				style={{
					backgroundImage: 'url(https://picsum.photos/1920/1080?random=hero)',
				}}
			/>
			<div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
			<div className="relative z-10 mx-auto max-w-6xl px-4 text-center">
				<motion.h1
					className="mb-8 text-4xl font-light tracking-widest text-white md:text-6xl lg:text-8xl"
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					{t('title')}
				</motion.h1>
				<motion.p
					className="mb-16 text-lg font-light text-white md:text-xl lg:text-2xl"
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					{t('description')}
				</motion.p>
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
				>
					<div className="mt-8 flex justify-center">
						<Button
							size="lg"
							variant="outline"
							className="rounded-full px-6 py-2 text-sm transition-colors hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
						>
							{t('cta')}
						</Button>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
