import FeedbackItem from "./FeedbackItem.tsx";
import Spinner from "../Spinner.tsx";
import ErrorMessage from "../ErrorMessage.tsx";
import {useFeedbackItemsStore} from "../../stores/feedbackStore.ts";


export default function FeedbackList() {
    const getFilteredFeedbackItems = useFeedbackItemsStore(state => state.getFilteredFeedbackItems());
    const isLoading = useFeedbackItemsStore(state => state.isLoading);
    const errorMessage = useFeedbackItemsStore(state => state.errorMessage);

    return <ol className={'feedback-list'}>

        {isLoading && <Spinner />}

        {errorMessage && <ErrorMessage message={errorMessage} />}

        {getFilteredFeedbackItems.map((feedbackItem) => <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />)}

    </ol>;
}
