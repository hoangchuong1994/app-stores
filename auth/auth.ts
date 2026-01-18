import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';

import prisma from '@/lib/prisma';

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(prisma),

	secret: process.env.AUTH_SECRET,

	session: {
		strategy: 'jwt',
	},

	pages: {
		signIn: '/auth/sign-in',
		error: '/auth/error',
	},

	providers: [
		Google,

		Credentials({
			name: 'credentials',

			credentials: {
				email: { type: 'email' },
				password: { type: 'password' },
			},

			async authorize(credentials) {
				if (
					!credentials ||
					typeof credentials.email !== 'string' ||
					typeof credentials.password !== 'string'
				) {
					return null;
				}

				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
					include: {
						role: {
							include: {
								permissions: true,
							},
						},
					},
				});

				if (!user || !user.password || !user.role || user.status !== 'ACTIVE')
					return null;

				const valid = await bcrypt.compare(credentials.password, user.password);

				if (!valid) return null;

				return {
					id: user.id,
					email: user.email,
					name: user.name,
					image: user.image,
					role: user.role.name,
					permissions: user.role.permissions.map((p) => p.code),
				};
			},
		}),
	],

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.role = user.role;
				token.permissions = user.permissions;
			}

			if (token.id && (!token.role || !token.permissions)) {
				const dbUser = await prisma.user.findUnique({
					where: { id: token.id as string },
					include: {
						role: { include: { permissions: true } },
					},
				});

				if (dbUser?.role) {
					token.role = dbUser.role.name;
					token.permissions = dbUser.role.permissions.map((p) => p.code);
				}
			}
			return token;
		},

		async session({ session, token }) {
			if (session.user && token.id && token.role && token.permissions) {
				session.user.id = token.id;
				session.user.role = token.role;
				session.user.permissions = token.permissions;
			}
			return session;
		},
	},
	events: {
		async createUser({ user }) {
			const role = await prisma.role.findUnique({
				where: { name: 'USER' },
			});

			if (!role) {
				throw new Error('USER role not seeded');
			}

			await prisma.user.update({
				where: { id: user.id },
				data: {
					roleId: role.id,
				},
			});
		},
	},
});
