import "server-only";
import {auth} from "@/lib/auth";
import {Pet} from "@prisma/client";
import prisma from "@/lib/db";

export async function checkAuth() {
    const session = await auth();
    if (!session?.user) return {message: 'Not authenticated'};
    return session;
}

export async function getPetByPetId(petId: Pet["id"]) {
    const pet = await prisma.pet.findUnique({
        where: { id: petId }
    });
}