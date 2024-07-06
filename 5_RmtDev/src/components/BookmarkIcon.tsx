import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import {useBookmarksContext} from "../lib/hooks.ts";

type BookmarkIconProps = {
    id: number;
}
export default function BookmarkIcon({id} : BookmarkIconProps) {
    const {bookmarkedIds, onToggleBookmark} = useBookmarksContext()

  return (
    <button
        onClick={(e) => {
            onToggleBookmark(id)
            e.stopPropagation();
            e.preventDefault();
        }}
        className="bookmark-btn">
      <BookmarkFilledIcon className={bookmarkedIds.includes(id) ? 'filled' : ''} />
    </button>
  );
}
