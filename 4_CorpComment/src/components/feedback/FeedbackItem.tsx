import {TriangleUpIcon} from "@radix-ui/react-icons";
import {TFeedbackItem} from "../../lib/types.ts";
import {useState, MouseEvent} from "react";

type FeedbackItemProps = {
    feedbackItem: TFeedbackItem;
}
export default function FeedbackItem({feedbackItem}: FeedbackItemProps) {
    const [open, setOpen] = useState(false);
    const [upvoteCount, setUpvoteCount] = useState(feedbackItem.upvoteCount);

    const handleVote = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.currentTarget.disabled = true;
        setUpvoteCount(v => v + 1);
    }

    return <li
            onClick={() => setOpen(v => !v)}
            className={`feedback ${open && 'feedback--expand'}`}>

            <button onClick={handleVote}>
                <TriangleUpIcon/>
                <span>{upvoteCount}</span>
            </button>

            <div>
                <p>{feedbackItem.badgeLetter}</p>
            </div>

            <div>
                <p>{feedbackItem.company}</p>
                <p>{feedbackItem.text}</p>
            </div>

            <p>{feedbackItem.daysAgo === 0 ? 'NEW' : `${feedbackItem.daysAgo}d`}</p>
        </li>;
}
