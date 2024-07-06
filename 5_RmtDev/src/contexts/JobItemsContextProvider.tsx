import {createContext, PropsWithChildren, useCallback, useMemo, useState} from "react";
import {DirectionType, JobItem, SortBy} from "../lib/types.ts";
import {useSearchQuery, useSearchTextContext} from "../lib/hooks.ts";
import {RESULTS_PER_PAGE} from "../lib/constants.ts";


type JobItemsContextType = {
    jobItems: JobItem[] | undefined;
    totalNumberOfPages: number;
    totalNumberOfResults: number;
    jobItemsSortedAndSliced: JobItem[];
    isLoading: boolean;
    currentPage: number;
    sortBy: SortBy;
    handleChangePage: (direction: DirectionType) => void;
    handleSortBy: (sortBy: SortBy) => void;
}
export const JobItemsContext = createContext<JobItemsContextType | null>(null);

export default function JobItemsContextProvider({children} : PropsWithChildren) {
    const {debouncedSearchText} = useSearchTextContext();
    const {jobItems, isLoading} = useSearchQuery(debouncedSearchText);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState<SortBy>('relevant');

    const jobItemsSorted = useMemo(() => [...(jobItems || [])]?.sort((a, b) => {
        if (sortBy === 'relevant') {
            return b.relevanceScore - a.relevanceScore;
        } else if (sortBy === 'recent') {
            return a.daysAgo - b.daysAgo;
        }
        return 0;
    }), [jobItems, sortBy]);
    const totalNumberOfResults = jobItems?.length || 0;
    const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE;
    const jobItemsSortedAndSliced = useMemo(() => jobItemsSorted?.slice(
        currentPage*RESULTS_PER_PAGE-RESULTS_PER_PAGE,
        currentPage*RESULTS_PER_PAGE), [jobItemsSorted, currentPage]);


    const handleChangePage = useCallback((direction: DirectionType) => {
        if (direction === 'previous') {
            setCurrentPage(currentPage - 1);
        } else if (direction === 'next') {
            setCurrentPage(currentPage + 1);
        }
    }, []);

    const handleSortBy = useCallback((sortBy: SortBy) => {
        setSortBy(sortBy);
        setCurrentPage(1);
    }, []);


    const contextValue = useMemo(() => ({
        jobItems,
        totalNumberOfPages,
        totalNumberOfResults,
        jobItemsSortedAndSliced,
        isLoading,
        currentPage,
        sortBy,
        handleChangePage,
        handleSortBy
    }), [
        jobItems,
        totalNumberOfPages,
        totalNumberOfResults,
        jobItemsSortedAndSliced,
        isLoading,
        currentPage,
        sortBy,
        handleChangePage,
        handleSortBy
    ]);

    return <JobItemsContext.Provider value={contextValue}>

        {children}
    </JobItemsContext.Provider>
}
