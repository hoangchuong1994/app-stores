import type { ReactNode } from 'react';

import { Card, CardContent } from '@/components/ui/card';

type AuthCardProps = {
	children: ReactNode;
};

export function AuthCard({ children }: AuthCardProps) {
	return (
		<Card className="border-border/50 bg-background/80 w-full max-w-md rounded-2xl border py-2 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur">
			<CardContent className="p-8">
				<div className="space-y-6">{children}</div>
			</CardContent>
		</Card>
	);
}
