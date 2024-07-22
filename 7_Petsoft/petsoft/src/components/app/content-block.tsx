import {PropsWithChildren} from "react";
import {cn} from "@/lib/utils";

type ContentBlockProps = PropsWithChildren<{
    className?: string;
}>;
export default function ContentBlock({children, className=""} : ContentBlockProps) {

    return <div className={cn('bg-[#f7f8Fa] shadow-sm rounded-md overflow-hidden h-full w-full', className)}>{children}</div>;
}
