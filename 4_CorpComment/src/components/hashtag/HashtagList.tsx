import HashtagItem from "./HashtagItem.tsx";
import {useFeedbackItemsStore} from "../../stores/feedbackStore.ts";


export default function HashtagList() {

    const calculateCompanyList = useFeedbackItemsStore(state => state.calculateCompanyList());
    const selectCompany = useFeedbackItemsStore(state => state.selectCompany);

    return <ul className={'hashtags'}>

        {calculateCompanyList.map(company => <HashtagItem
                                        onSelectCompany={selectCompany}
                                        key={company}
                                        companyName={company} />)}

    </ul>;
}
