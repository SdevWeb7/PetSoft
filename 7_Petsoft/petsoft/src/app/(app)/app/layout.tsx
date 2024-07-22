import {PropsWithChildren} from "react";
import BackgroundPattern from "@/components/app/background-pattern";
import AppHeader from "@/components/app/app-header";
import AppFooter from "@/components/app/app-footer";
import PetContextProvider from "@/contexts/pet-context-provider";
import SearchContextProvider from "@/contexts/search-context-provider";
import prisma from "@/lib/db";
import { Toaster } from "sonner";
import {auth} from "@/lib/auth-no-edge";
import {redirect} from "next/navigation";

export default async function AppLayout({children}: PropsWithChildren) {
    const session = await auth();
    if (!session?.user) redirect('/login');

    const pets = await prisma.pet.findMany({
        where: { userId: session.user.id }
    });

    return <>

        <BackgroundPattern />

        <div className={'max-w-[1050px] min-h-screen flex flex-col mx-auto px-4'}>
            <AppHeader />

            <SearchContextProvider>
                <PetContextProvider data={pets}>
                    {children}
                </PetContextProvider>
            </SearchContextProvider>

            <AppFooter />
        </div>

        <Toaster position="top-right" />
    </>
}
