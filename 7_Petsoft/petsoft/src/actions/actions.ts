"use server";

import prisma from "@/lib/db";
import {revalidatePath} from "next/cache";
import {petFormSchema, petIdSchema} from "@/lib/zod-schemas";
import {auth} from "@/lib/auth-no-edge";

export async function addPet(newPet: unknown) {
   await new Promise((resolve) => setTimeout(resolve, 2000));

   const session = await auth();
   if (!session?.user) return {message: 'Not authenticated'};

   const validatedPet = petFormSchema.safeParse(newPet);
   if (!validatedPet.success) return {message: 'Invalid pet data'};

   try {
      await prisma.pet.create({
         data: {
             ...validatedPet.data,
            user: {
                 connect: {
                     id: session.user.id
                 }
            }
         }
     })
   } catch (e) {
       return {message: 'Could not add pet'};
   }
    
    revalidatePath('/app', 'layout');
}

export async function editPet(id: unknown, newPet: unknown) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const session = await auth();
    if (!session?.user) return {message: 'Not authenticated'};

    const validatedPet = petFormSchema.safeParse(newPet);
    if (!validatedPet.success) return {message: 'Invalid pet data'};
    const validatedId = petIdSchema.safeParse(id);
    if (!validatedId.success) return {message: 'Invalid pet ID'};

    const pet = await prisma.pet.findUnique({
        where: { id: validatedId.data },
        select: { userId: true }
    })
    if (!pet) return {message: 'Pet not found'};
    if (pet.userId !== session.user.id) return {message: 'Not authorized'};

    try {
        await prisma.pet.update({
            where: { id: validatedId.data },
            data: validatedPet.data,
        })
    } catch (e) {
        return {message: 'Could not edit pet'};
    }

    revalidatePath('/app', 'layout');
}

export async function checkoutPet(id: unknown) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const session = await auth();
    if (!session?.user) return {message: 'Not authenticated'};

    const validatedId = petIdSchema.safeParse(id);
    if (!validatedId.success) return {message: 'Invalid pet ID'};

    const pet = await prisma.pet.findUnique({
        where: { id: validatedId.data },
        select: { userId: true }
    })
    if (!pet) return {message: 'Pet not found'};
    if (pet.userId !== session.user.id) return {message: 'Not authorized'};

    try {
        await prisma.pet.delete({
            where: { id: validatedId.data }
        })
    } catch (e) {
        return {message: 'Could not checkout pet'};
    }

    revalidatePath('/app', 'layout');
}
