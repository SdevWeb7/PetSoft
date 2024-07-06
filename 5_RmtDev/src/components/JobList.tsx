import JobListItem from "./JobListItem.tsx";
import Spinner from "./Spinner.tsx";
import {JobItem} from "../lib/types.ts";
import {useActiveIdContext} from "../lib/hooks.ts";

type JobListProps = {
  jobItems: JobItem[];
  loading: boolean;
};
export function JobList({jobItems, loading}: JobListProps) {
  const {activeId} = useActiveIdContext();

  return <ul className="job-list">

    {loading ? <Spinner /> : jobItems.map((jobItem, index) => <JobListItem key={index} jobItem={jobItem} isActive={jobItem.id === activeId} />)}

  </ul>;
}

export default JobList;
