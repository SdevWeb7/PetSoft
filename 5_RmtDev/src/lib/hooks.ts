import {Dispatch, RefObject, SetStateAction, useContext, useEffect, useState} from "react";
import {JobItem, JobItemDetails} from "./types.ts";
import {BASE_API_URL} from "./constants.ts";
import {useQueries, useQuery} from "@tanstack/react-query";
import {handleError} from "./utils.ts";
import {BookmarksContext} from "../contexts/BookmarksContextProvider.tsx";
import {ActiveIdContext} from "../contexts/ActiveIdContextProvider.tsx";
import {SearchTextContext} from "../contexts/SearchTextContextProvider.tsx";
import {JobItemsContext} from "../contexts/JobItemsContextProvider.tsx";

type JobItemsResponse = {
    public: boolean;
    sorted: boolean;
    jobItems: JobItem[];
}
const fetchJobItems = async (searchText: string) : Promise<JobItemsResponse> => {
    const response = await fetch(BASE_API_URL+'?search='+searchText);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.description);
    }
    const data = await response.json();
    return data;
}
export function useSearchQuery(searchText: string){
    const {data, isInitialLoading} = useQuery(['jobItems', searchText], () => fetchJobItems(searchText), {
        staleTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        retry: false,
        enabled: Boolean(searchText),
        onError: handleError
    });

    const jobItems = data?.jobItems;
    const isLoading = isInitialLoading;
    return {jobItems, isLoading} as const;

}



type JobItemResponse = {
    jobItem: JobItemDetails;
    public: boolean;
}
const fetchJobItem = async (id: number) : Promise<JobItemResponse> => {
    const response = await fetch(BASE_API_URL+'/'+id);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.description);
    }
    const data = await response.json();
    return data;
}
export function useJobItem(activeId: number | null) {
    const {data, isInitialLoading} = useQuery(['jobItem', activeId], () => activeId ? fetchJobItem(activeId) : null, {
        staleTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        retry: false,
        enabled: Boolean(activeId),
        onError: handleError
    });

    const jobItem = data?.jobItem;
    const isLoading = isInitialLoading;
    return {jobItem, isLoading} as const;
}


export function useJobItems(ids: number[]) {
    const results = useQueries({
        queries: ids.map(id => ({
            queryKey: ['jobItem', id],
            queryFn: () => fetchJobItem(id),
            staleTime: 1000 * 60 * 60,
            refetchOnWindowFocus: false,
            retry: false,
            enabled: Boolean(id),
            onError: handleError
        })),
    });
    const jobItems = results.map(result => result.data?.jobItem).filter(jobItem => Boolean(jobItem)) as JobItemDetails[];
    const isLoading = results.some(result => result.isLoading);
    return {jobItems, isLoading};
}


export function useActiveId() {
    const [activeId, setActiveId] = useState<number | null>(null);

    useEffect(() => {
        const handleHashChange = () => {
            setActiveId(+window.location.hash.slice(1));
        }
        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        }
    }, []);

    return activeId;
}


export function useLocalStorage<T>(key: string, initialValue: T) : [T, Dispatch<SetStateAction<T>>] {
    const [storedValue, setStoredValue] = useState(() => JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue)));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedValue));

    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}


export function useDebounce<T>(value: T, delay = 1000) : T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timerId = setTimeout(() => setDebouncedValue(value), delay);

        return () => clearTimeout(timerId);
    }, [value, delay]);

    return debouncedValue;
}


export function useBookmarksContext() {
    const context = useContext(BookmarksContext);
    if (!context) {
        throw new Error('useBookmarksContext must be used within a BookmarksContextProvider');
    }
    return context;
}

export function useActiveIdContext() {
    const context = useContext(ActiveIdContext);
    if (!context) {
        throw new Error('useActiveIdContext must be used within a ActiveIdContextProvider');
    }
    return context;
}

export function useSearchTextContext() {
    const context = useContext(SearchTextContext);
    if (!context) {
        throw new Error('useActiveIdContext must be used within a ActiveIdContextProvider');
    }
    return context;
}

export function useJobItemsContext() {
    const context = useContext(JobItemsContext);
    if (!context) {
        throw new Error('useActiveIdContext must be used within a ActiveIdContextProvider');
    }
    return context;
}


export function useOnClickOutside(refs: RefObject<HTMLElement>[], handler: () => void) {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (refs.every(ref => !ref.current?.contains(e.target as Node))){
                handler();
            }
        }
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [refs, handler]);
}