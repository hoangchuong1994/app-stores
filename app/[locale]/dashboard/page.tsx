'use client';

import { useSession } from 'next-auth/react';

export default function Dashboard() {
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return <p>Loading...</p>;
	}

	return (
		<div className="space-y-4">
			<h1>Session debug</h1>

			<pre className="bg-muted rounded-md p-4 text-sm">
				{JSON.stringify(session, null, 2)}
			</pre>
		</div>
	);
}
