import {createContext, PropsWithChildren, useEffect} from "react";
import {useJobItems, useLocalStorage} from "../lib/hooks.ts";
import {JobItemDetails} from "../lib/types.ts";

type BookmarksContextType = {
    bookmarkedIds: number[];
    onToggleBookmark: (id: number) => void;
    bookMarkedJobItems: JobItemDetails[];
    isLoading: boolean;
}
export const BookmarksContext = createContext<BookmarksContextType | null>(null);

export default function BookmarksContextProvider({children}: PropsWithChildren) {
    const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>('bookmarkedIds', []);
    const {jobItems: bookMarkedJobItems, isLoading} = useJobItems(bookmarkedIds);

    const handleToggleBookmark = (id: number) => {
        if (bookmarkedIds.includes(id)) {
            setBookmarkedIds(bookmarkedIds.filter(bookmarkedId => bookmarkedId !== id));
        } else {
            setBookmarkedIds([...bookmarkedIds, id]);
        }
    }

    useEffect(() => {
        localStorage.setItem('bookmarkedIds', JSON.stringify(bookmarkedIds));
    }, [bookmarkedIds]);

    return <BookmarksContext.Provider value={{
                                            bookmarkedIds,
                                            onToggleBookmark: handleToggleBookmark,
                                            bookMarkedJobItems,
                                            isLoading}}>

        {children}
    </BookmarksContext.Provider>
}

