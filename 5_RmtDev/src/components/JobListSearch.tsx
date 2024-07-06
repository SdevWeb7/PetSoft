import JobList from "./JobList.tsx";
import {useJobItemsContext} from "../lib/hooks.ts";


export default function JobListSearch() {
    const {jobItemsSortedAndSliced, isLoading} = useJobItemsContext();


    return <JobList jobItems={jobItemsSortedAndSliced} loading={isLoading} />
}
