import { CTA } from '@/components/CTA';
import { Hero } from '@/components/Hero';

export default async function Home() {
	return (
		<div className="min-h-screen bg-white dark:bg-gray-900">
			<main>
				<Hero />
				<CTA />
			</main>
		</div>
	);
}
