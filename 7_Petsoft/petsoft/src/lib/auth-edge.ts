import prisma from "@/lib/db";
import {NextAuthConfig} from "next-auth";


export const nextAuthEdgeConfig = {
    pages: {
        signIn: '/login'
    },
    session: {
        maxAge: 30 * 24 * 60 * 60,
        strategy: 'jwt',
    },
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
    },
    providers: []
} satisfies NextAuthConfig;