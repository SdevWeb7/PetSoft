import {createContext, PropsWithChildren, useState} from "react";
import {useDebounce} from "../lib/hooks.ts";

type SearchTextContextType = {
    searchText: string;
    handleChangeSearchText: (text: string) => void;
    debouncedSearchText: string;
}

export const SearchTextContext = createContext<SearchTextContextType | null>(null);

export default function SearchTextContextProvider({children} : PropsWithChildren) {
    const [searchText, setSearchText] = useState('');
    const debouncedSearchText = useDebounce(searchText, 500);

    const handleChangeSearchText = (text: string) => {
        setSearchText(text);
    }

    return <SearchTextContext.Provider value={{searchText, handleChangeSearchText, debouncedSearchText}}>

        {children}
    </SearchTextContext.Provider>
}
