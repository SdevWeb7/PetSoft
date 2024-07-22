import {PropsWithChildren} from "react";
import Logo from "@/components/logo";


export default async function AuthLayout({children} :PropsWithChildren) {

    return <main className={"flex flex-col justify-center items-center min-h-screen gap-y-5"}>


        <Logo />

        {children}
    </main>
}
