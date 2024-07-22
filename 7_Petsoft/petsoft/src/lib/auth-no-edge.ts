import NextAuth, {NextAuthConfig} from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import {authSchema} from "@/lib/zod-schemas";
import {nextAuthEdgeConfig} from "@/lib/auth-edge";

const authConfig = {
    ...nextAuthEdgeConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedAuthData = authSchema.safeParse(credentials);
                if (!validatedAuthData.success) return null;

                const { email, password } = validatedAuthData.data;
                const user = await prisma.user.findUnique({
                    where: { email: email }
                });
                if (!user) return null;

                const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

                if (!passwordMatch) return null;
                return user;
            }
        })
    ]
} satisfies NextAuthConfig;


export const { auth, signIn, signOut, handlers: {GET, POST} } = NextAuth(authConfig);