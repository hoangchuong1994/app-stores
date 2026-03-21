import type { ReactNode } from 'react';
import { AuthMotionWrapper } from '@/components/AuthMotionWrapper';
import { AuthCard } from '@/components/auth/AuthCard';

export default function AuthenticationLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<main className="relative flex min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
			{/* Blur circle nền chính */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 flex justify-center"
			>
				<div className="bg-primary/30 dark:bg-primary/20 -mt-32 h-64 w-64 rounded-full shadow-xl blur-[140px] sm:h-80 sm:w-80" />
			</div>

			{/* Vòng gradient thứ 2, nhỏ hơn, tạo depth */}
			<div
				aria-hidden
				className="pointer-events-none absolute top-1/3 left-1/4 h-40 w-40 rounded-full bg-pink-300 opacity-40 blur-[100px] dark:bg-pink-600"
			/>

			{/* Container chính */}
			<section
				aria-label="Authentication"
				className="relative z-10 flex flex-1 items-center justify-center px-4"
			>
				<AuthMotionWrapper>
					<AuthCard>{children}</AuthCard>
				</AuthMotionWrapper>
			</section>
		</main>
	);
}
