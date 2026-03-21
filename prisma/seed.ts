import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient, UserRole } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

/**
 * Prisma client (PostgreSQL)
 */
const prisma = new PrismaClient({
	adapter: new PrismaPg({
		connectionString: process.env.DATABASE_URL!,
	}),
});

/* --------------------------------------------------
 * PERMISSIONS
 * -------------------------------------------------- */
const PERMISSIONS = [
	'admin.access',

	'user.read',
	'user.write',

	'product.read',
	'product.create',
	'product.update',
	'product.delete',

	'order.read',
	'order.update',
	'order.cancel',
	'order.refund',
] as const;

/* --------------------------------------------------
 * ROLE → PERMISSIONS
 * -------------------------------------------------- */
const ROLE_PERMISSIONS: Record<UserRole, readonly string[]> = {
	SUPER_ADMIN: PERMISSIONS,

	ADMIN: [
		'admin.access',
		'user.read',
		'user.write',
		'product.read',
		'product.create',
		'product.update',
		'product.delete',
		'order.read',
		'order.update',
		'order.cancel',
		'order.refund',
	],

	STAFF: ['product.read', 'product.update', 'order.read', 'order.update'],

	SELLER: ['product.read', 'product.create', 'product.update', 'order.read'],

	CUSTOMER: ['product.read', 'order.read'],
};

/* --------------------------------------------------
 * HELPERS
 * -------------------------------------------------- */
async function seedPermissions() {
	await prisma.permission.createMany({
		data: PERMISSIONS.map((code) => ({ code })),
		skipDuplicates: true,
	});

	return prisma.permission.findMany({
		where: { code: { in: [...PERMISSIONS] } },
	});
}

async function seedRoles(permissions: { id: string; code: string }[]) {
	for (const role of Object.values(UserRole)) {
		const codes = ROLE_PERMISSIONS[role] ?? [];
		const rolePermissions = permissions
			.filter((p) => codes.includes(p.code))
			.map((p) => ({ id: p.id }));

		await prisma.role.upsert({
			where: { name: role },
			update: {
				permissions: {
					set: rolePermissions,
				},
			},
			create: {
				name: role,
				permissions: {
					connect: rolePermissions,
				},
			},
		});
	}
}

async function seedSuperAdmin() {
	const role = await prisma.role.findUnique({
		where: { name: 'SUPER_ADMIN' },
	});

	if (!role) throw new Error('SUPER_ADMIN role not found');

	const passwordHash = await bcrypt.hash('123456', 10);

	await prisma.user.upsert({
		where: { email: 'admin@test.com' },
		update: {
			roleId: role.id,
			status: 'ACTIVE',
		},
		create: {
			email: 'admin@test.com',
			name: 'Super Admin',
			password: passwordHash,
			roleId: role.id,
			status: 'ACTIVE',
		},
	});
}

/* --------------------------------------------------
 * MAIN
 * -------------------------------------------------- */
async function main() {
	console.log('🌱 RBAC seed started');

	const permissions = await seedPermissions();
	console.log('✅ Permissions ready');

	await seedRoles(permissions);
	console.log('✅ Roles synced');

	await seedSuperAdmin();
	console.log('✅ Super admin ready');

	console.log('🎉 Seed completed (idempotent)');
}

/* --------------------------------------------------
 * RUN
 * -------------------------------------------------- */
main()
	.catch((err) => {
		console.error('❌ Seed failed');
		console.error(err);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
