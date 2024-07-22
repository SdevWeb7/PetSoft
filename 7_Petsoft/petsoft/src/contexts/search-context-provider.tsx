"use client";

import {createContext, PropsWithChildren, useState} from "react";

type SearchContextType = {
    searchQuery: string;
    handleSearch: (newValue: string) => void;
}
export const SearchContext = createContext<SearchContextType | null>(null);


export default function SearchContextProvider({children} : PropsWithChildren) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (newValue: string) => {
        setSearchQuery(newValue);
    }


    return <SearchContext.Provider value={{searchQuery, handleSearch}}>
        {children}
    </SearchContext.Provider>
}
