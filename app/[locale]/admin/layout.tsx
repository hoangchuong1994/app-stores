export default function UserLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<h1>Admin layout</h1>
			{children}
		</>
	);
}
