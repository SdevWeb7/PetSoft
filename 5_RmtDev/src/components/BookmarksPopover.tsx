import JobList from "./JobList.tsx";
import {useBookmarksContext} from "../lib/hooks.ts";
import {forwardRef} from "react";
import {createPortal} from "react-dom";


export const BookmarksPopover = forwardRef<HTMLDivElement>(function(_, ref) {
  const {bookMarkedJobItems, isLoading} = useBookmarksContext();

  return createPortal(<div ref={ref} className="bookmarks-popover">

    <JobList jobItems={bookMarkedJobItems} loading={isLoading} />

  </div>, document.body);
});

export default BookmarksPopover;
