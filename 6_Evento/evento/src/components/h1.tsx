import {PropsWithChildren} from "react";
import {cn} from "@/lib/utils";


export default function H1({children, className = ''}: PropsWithChildren<{className?: string}>) {

    return <h1 className={cn('text-3xl lg:text-6xl font-bold tracking-tight', className)}>{children}</h1>

}
