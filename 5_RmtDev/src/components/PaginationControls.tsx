import {ArrowLeftIcon, ArrowRightIcon} from "@radix-ui/react-icons";
import {DirectionType} from "../lib/types.ts";
import {useJobItemsContext} from "../lib/hooks.ts";


export default function PaginationControls() {
    const {currentPage, totalNumberOfPages, handleChangePage} = useJobItemsContext();

  return <section className="pagination">
    {currentPage > 1 && (
        <PaginationButton
            currentPage={currentPage}
            direction={'previous'}
            onChangePage={() => handleChangePage('previous')} />)}


    {currentPage < totalNumberOfPages && (
        <PaginationButton
            currentPage={currentPage}
            direction={'next'}
            onChangePage={() => handleChangePage('next')} />)}

  </section>;
}

type PaginationButtonProps = {
    direction: DirectionType;
    currentPage: number;
    onChangePage: () => void;
};
function PaginationButton ({direction, currentPage, onChangePage}: PaginationButtonProps) {
  return <button
      onClick={e => {
        e.currentTarget.blur();
        onChangePage();
      }}
      className={`pagination__button pagination__button--${direction}`}>

    {direction === 'previous' && <><ArrowLeftIcon/> Page {currentPage-1}</>}

    {direction === 'next' && <>Page {currentPage+1}<ArrowRightIcon /></>}
  </button>
}