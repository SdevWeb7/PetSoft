import {twMerge} from "tailwind-merge";
import clsx, {ClassValue} from "clsx";


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(...inputs));
}


export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


export async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
