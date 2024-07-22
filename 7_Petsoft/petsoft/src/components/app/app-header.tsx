"use client";

import Logo from "@/components/logo";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";


const routes = [
    {
        name: 'Dashboard',
        path: "/app/dashboard"
    },
    {
        name: 'Account',
        path: "/app/account"
    }

]

export default function AppHeader() {
    const activePathname = usePathname();

    return <header className={'flex justify-between items-center border-b border-white/10 py-2'}>
        <Logo/>

        <nav>
            <ul className={'flex gap-2 text-xs'}>
                {routes.map(route => (
                    <li key={route.path}>
                        <Link
                            href={route.path}
                            className={cn("text-white/70 rounded-sm px-2 py-1 hover:text-white focus:text-white transition", {
                                "bg-black/10 text-white": activePathname === route.path
                            })}>{route.name}</Link>
                    </li>))}
            </ul>
        </nav>
    </header>
}
