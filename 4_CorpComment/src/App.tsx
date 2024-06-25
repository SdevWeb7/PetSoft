import HashtagList from "./components/hashtag/HashtagList.tsx";
import Footer from "./components/layout/Footer.tsx";
import Container from "./components/layout/Container.tsx";
import {useEffect} from "react";
import {useFeedbackItemsStore} from "./stores/feedbackStore.ts";

function App() {
    const fetchFeedbacksItems = useFeedbackItemsStore(state => state.fetchFeedbacksItems);

    useEffect(() => {
        fetchFeedbacksItems();
    }, [fetchFeedbacksItems]);

  return (
    <div className={'app'}>

      <Footer />

      <Container />

      <HashtagList />

    </div>
  )
}

export default App
