"use server";

import {signIn, signOut} from "@/lib/auth";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import {authSchema} from "@/lib/zod-schemas";
import {Prisma} from "@prisma/client";
import {AuthError} from "next-auth";

export async function logIn(prevState: unknown, formData: unknown) {
    if (!(formData instanceof FormData)) return { message: "Invalid form data" };

    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin": return { message: "Invalid credentials" };
                default: return { message: "Internal server error" };
            }
        }
        throw error;
    }
}

export async function signUp(prevState: unknown, formData: unknown) {
    if (!(formData instanceof FormData)) return { message: "Invalid form data" };
    const validatedFormData = authSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validatedFormData.success) return { message: "Invalid form data" };

    const { email, password } = validatedFormData.data;
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await prisma.user.create({
            data: {
                email: email,
                hashedPassword: hashedPassword
            }
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            return {message: "Email already exists"};
        }
        return { message: "Internal error" };
    }
    await signIn('credentials', formData);
}

export async function logOut() {
    await signOut({ redirectTo: "/" });
}