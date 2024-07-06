import {SortBy} from "../lib/types.ts";
import {PropsWithChildren} from "react";
import {useJobItemsContext} from "../lib/hooks.ts";


export default function SortingControls() {
    const { sortBy, handleSortBy } = useJobItemsContext();

  return (
    <section className="sorting">
        <i className="fa-solid fa-arrow-down-short-wide"></i>

        <SortingButton handleSortBy={() => handleSortBy('relevant')} isActive={sortBy === 'relevant'} value={"relevant"}>
            Relevant
        </SortingButton>

        <SortingButton handleSortBy={() => handleSortBy('recent')} isActive={sortBy === 'recent'} value={"recent"}>
            Recent
        </SortingButton>
    </section>
  );
}

type SortingButtonProps = PropsWithChildren<{
    handleSortBy: () => void;
    isActive: boolean;
    value: SortBy;
}>;
function SortingButton({handleSortBy, isActive, value, children} : SortingButtonProps) {
  return <button
      onClick={handleSortBy}
      className={`sorting__button sorting__button--${value} ${isActive && 'sorting__button--active'}`}>
    {children}
  </button>
}