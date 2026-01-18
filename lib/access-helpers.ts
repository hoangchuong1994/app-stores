export function matchRoute(pathname: string, routes: readonly string[]) {
	return routes.some(
		(route) => pathname === route || pathname.startsWith(route + '/'),
	);
}

export function matchPermissionRoute(
	pathname: string,
	map: Record<string, readonly string[]>,
) {
	return Object.entries(map).find(
		([route]) => pathname === route || pathname.startsWith(route + '/'),
	);
}
