import { create } from "zustand";
import {TFeedbackItem} from "../lib/types.ts";

type FeedbackStore = {
    feedbackItems: TFeedbackItem[];
    isLoading: boolean;
    errorMessage: string;
    selectedCompany: string;
    calculateCompanyList: () => string[];
    getFilteredFeedbackItems: () => TFeedbackItem[];
    selectCompany: (company: string) => void;
    addItemToList: (feedbackText: string) => Promise<void>;
    fetchFeedbacksItems: () => Promise<void>;
};

export const useFeedbackItemsStore = create<FeedbackStore>((set, get) => ({
      feedbackItems: [],
      isLoading: false,
      errorMessage: "",
      selectedCompany: "",
      calculateCompanyList: () => {
          return get().feedbackItems.map(item => item.company)
                    .filter((company, index, array) => array.indexOf(company) === index);
      },
      getFilteredFeedbackItems: () => {
          const selectedCompany = get().selectedCompany;
          return selectedCompany ? get().feedbackItems.filter(item => item.company === selectedCompany) : get().feedbackItems;
      },
      selectCompany: (company) => set(() => ({ selectedCompany: company })),
      addItemToList: async (feedbackText) => {
         const companyName = feedbackText.split(" ").find(word => word.includes("#")).substring(1);
         const newItem: TFeedbackItem = {
            id: new Date().getTime(),
            upvoteCount: 0,
            badgeLetter: companyName.substring(0, 1).toUpperCase(),
            company: companyName,
            text: feedbackText,
            daysAgo: 0
         };
         set(state => ({feedbackItems: [...state.feedbackItems, newItem]}));
         await fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks', {
            method: 'POST',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
         })
      },
      fetchFeedbacksItems: async () => {
           set(() => ({isLoading: true}));
           try {
              const response = await fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks');
              if (!response.ok) {
                   throw new Error('Failed to fetch feedbacks');
              }
              const data = await response.json();
              set(() => ({feedbackItems: data.feedbacks}));
           } catch (error) {
              set(() => ({errorMessage: error.message}));
           }
           set(() => ({isLoading: false}));
      }
}));