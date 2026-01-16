import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

import { verifyPassword } from "@/lib/password";
import { toAuthUser } from "@/lib/to-auth-user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  providers: [
    Credentials({
      name: "credentials",
      authorize: async (credentials) => {
        try {
          if (
            !credentials?.email ||
            typeof credentials.email !== "string" ||
            !credentials.password ||
            typeof credentials.password !== "string"
          ) {
            return null;
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            select: {
              id: true,
              email: true,
              name: true,
              password: true,
            },
          });

          if (!user || !user.password || !user.email) {
            return null;
          }

          const isValid = await verifyPassword(
            credentials.password,
            user.password
          );

          if (!isValid) {
            return null;
          }

          return toAuthUser({
            id: user.id,
            email: user.email,
            name: user.name,
          });
        } catch (err) {
          console.error("Error in Credentials authorize:", err);
          return null;
        }
      },
    }),

    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),

    Github({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
});
