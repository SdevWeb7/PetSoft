import Link from "next/link";
import {ArrowLeftIcon, ArrowRightIcon} from "@radix-ui/react-icons";

const btnStyles = "flex items-center gap-x-2 text-white px-5 py-3 bg-white/5 rounded-md opacity-75 hover:opacity-100 transition text-sm"

type PaginationControlsProps = {
    previousPath: string;
    nextPath: string;
};
export default function PaginationControls({previousPath, nextPath} : PaginationControlsProps) {

    return <section className={'flex justify-between w-full'}>

        {previousPath ? <Link
            className={btnStyles}
            href={previousPath}><ArrowLeftIcon /> Previous</Link> : <div/>}


        {nextPath && <Link
            className={btnStyles}
            href={nextPath}>Next<ArrowRightIcon /></Link>}
    </section>
}
