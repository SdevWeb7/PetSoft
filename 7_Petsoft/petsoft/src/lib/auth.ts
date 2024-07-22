import NextAuth, {NextAuthConfig} from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import {authSchema} from "@/lib/zod-schemas";

const authConfig = {
    pages: {
        signIn: '/login'
    },
    session: {
        maxAge: 30 * 24 * 60 * 60,
        strategy: 'jwt',
    },
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
    ],
    callbacks: {
        authorized: async ({ auth, request }) => {
            const isLoggedIn = Boolean(auth?.user);
            const isTryingToAccessApp = request.nextUrl.pathname.includes('/app');
            if (!isLoggedIn && isTryingToAccessApp) {
                return false;
            }
            if (isLoggedIn && isTryingToAccessApp && !auth?.user.hasAccess) {
                return Response.redirect(new URL('/payment', request.nextUrl));
            }
            if (isLoggedIn && isTryingToAccessApp && auth?.user.hasAccess) {
                return true;
            }
            if (isLoggedIn && (request.nextUrl.pathname.includes("/login") || request.nextUrl.pathname.includes("/sign-up")) && auth?.user.hasAccess) {
                return Response.redirect(new URL('/app/dashboard', request.nextUrl));
            }
            if (isLoggedIn && !isTryingToAccessApp && !auth?.user.hasAccess) {
                if ((request.nextUrl.pathname.includes("/login") || request.nextUrl.pathname.includes("/sign-up"))) {
                    return Response.redirect(new URL('/payment', request.nextUrl));
                }
                return true;
            }
            if (!isLoggedIn && !isTryingToAccessApp) {
                return true;
            }
            return false;
        },
        jwt: async({ token, user, trigger }) => {
            if (user) {
                token.userId = user.id;
                token.email = user.email;
                //@ts-ignore
                token.hasAccess = user.hasAccess;
            }
            if (trigger === 'update') {
                const user = await prisma.user.findUnique({
                    where: {
                        email: token.email as string
                    }
                });
                if (user) token.hasAccess = user.hasAccess;
            }
            return token;
        },
        session: ({ session, token }) => {
            // @ts-ignore
            session.user.id = token.userId;
            session.user.hasAccess = !!token.hasAccess;
            return session;
        }
    }
} satisfies NextAuthConfig;


export const { auth, signIn, signOut, handlers: {GET, POST} } = NextAuth(authConfig);