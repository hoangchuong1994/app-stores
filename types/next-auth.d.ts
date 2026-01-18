import type { RoleCode, PermissionCode } from '@/types/auth.types';
import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
			email?: string | null;
			name?: string | null;
			image?: string | null;

			role: RoleCode;
			permissions: PermissionCode[];
		};
	}

	interface User {
		role: RoleCode;
		permissions: PermissionCode[];
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		id?: string;
		role?: RoleCode;
		permissions?: PermissionCode[];
	}
}
