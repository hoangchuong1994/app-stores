import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

/**
 * Prisma client (PostgreSQL)
 */
const prisma = new PrismaClient({
	adapter: new PrismaPg({
		connectionString: process.env.DATABASE_URL!,
	}),
});

/**
 * CONSTANTS
 */
const PERMISSIONS = [
	'admin.access',
	'user.read',
	'user.write',
	'product.read',
	'product.write',
] as const;

type RoleName = 'ADMIN' | 'MODERATOR' | 'USER';

const ROLE_PERMISSIONS: Record<RoleName, readonly string[]> = {
	ADMIN: PERMISSIONS,
	MODERATOR: ['user.read', 'product.read', 'product.write'],
	USER: ['product.read'],
};

async function main() {
	console.log('🌱 Start seeding RBAC...');

	/**
	 * 1. Seed permissions
	 */
	const permissions = await Promise.all(
		PERMISSIONS.map((code) =>
			prisma.permission.upsert({
				where: { code },
				update: {},
				create: { code },
			}),
		),
	);

	console.log('✅ Permissions seeded');

	/**
	 * 2. Seed roles + assign permissions
	 */
	for (const roleName of Object.keys(ROLE_PERMISSIONS) as RoleName[]) {
		const permissionCodes = ROLE_PERMISSIONS[roleName];

		await prisma.role.upsert({
			where: { name: roleName },
			update: {
				permissions: {
					set: permissions
						.filter((p) => permissionCodes.includes(p.code))
						.map((p) => ({ id: p.id })),
				},
			},
			create: {
				name: roleName,
				permissions: {
					connect: permissions
						.filter((p) => permissionCodes.includes(p.code))
						.map((p) => ({ id: p.id })),
				},
			},
		});

		console.log(`✅ Role ${roleName} seeded`);
	}

	/**
	 * 3. Create / sync admin user
	 */
	const adminRole = await prisma.role.findUnique({
		where: { name: 'ADMIN' },
	});

	if (!adminRole) {
		throw new Error('ADMIN role not found – RBAC seed failed');
	}

	await prisma.user.upsert({
		where: { email: 'admin@test.com' },
		update: {
			roleId: adminRole.id,
			status: 'ACTIVE',
		},
		create: {
			email: 'admin@test.com',
			name: 'Admin',
			password: await bcrypt.hash('123456', 10),
			roleId: adminRole.id,
			status: 'ACTIVE',
		},
	});

	console.log('✅ Admin user ready');
	console.log('🎉 Seed completed successfully');
}

/**
 * Run seed
 */
main()
	.catch((err) => {
		console.error('❌ Seed failed');
		console.error(err);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
