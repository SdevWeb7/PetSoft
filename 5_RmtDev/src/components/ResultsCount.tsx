import {useJobItemsContext} from "../lib/hooks.ts";


export default function ResultsCount() {
    const {totalNumberOfResults} = useJobItemsContext();

  return <p className="count"><span className="u-bold">{totalNumberOfResults}</span> results</p>;
}
