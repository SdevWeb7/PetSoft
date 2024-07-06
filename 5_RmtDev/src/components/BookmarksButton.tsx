import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover.tsx";
import {useRef, useState} from "react";
import {useOnClickOutside} from "../lib/hooks.ts";

export default function BookmarksButton() {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    useOnClickOutside([buttonRef, popoverRef], () => setOpen(false));



  return (
    <section>
      <button
          ref={buttonRef}
          onClick={() => setOpen(v => !v)}
          className="bookmarks-btn">
        Bookmarks <TriangleDownIcon />
      </button>

        {open && <BookmarksPopover ref={popoverRef} />}
    </section>
  );
}
