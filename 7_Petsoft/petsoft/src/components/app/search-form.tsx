"use client";


import {useSearchQuery} from "@/lib/hooks";

export default function SearchForm() {
    const {searchQuery, handleSearch} = useSearchQuery();

    return <form className={'h-full w-full'}>
        <input
            placeholder={"Search pets"}
            type={"search"}
            value={searchQuery}
            onChange={e => handleSearch(e.target.value)}
            className={'h-full w-full bg-white/20 rounded-md px-5 outline-none transition focus:bg-white/50 hover:bg-white/30 placeholder:text-black/50'} />
    </form>
}
