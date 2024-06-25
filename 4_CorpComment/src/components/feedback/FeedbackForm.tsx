import {ChangeEvent, FormEvent, useState} from "react";
import {useFeedbackItemsStore} from "../../stores/feedbackStore.ts";

const MAX_CHARACTERS = 150;


export default function FeedbackForm() {
    const addItemToList = useFeedbackItemsStore(state => state.addItemToList);
    const [text, setText] = useState('');
    const [showValidIndicator, setShowValidIndicator] = useState(false);
    const [showInvalidIndicator, setShowInvalidIndicator] = useState(false);
    const charCount = MAX_CHARACTERS - text.length;


    const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length > MAX_CHARACTERS) {
            setText(e.target.value.slice(0, MAX_CHARACTERS));
            return;
        }

        setText(e.target.value);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (text.trim() === '' || !text.includes('#')) {
            setShowInvalidIndicator(true);
            setTimeout(() => setShowInvalidIndicator(false), 3000);
            return;
        }
        await addItemToList(text);
        setShowValidIndicator(true);
        setTimeout(() => setShowValidIndicator(false), 3000);
        setText('');
    }

    return <form
                onSubmit={handleSubmit}
                className={`form ${showValidIndicator && 'form--valid'} ${showInvalidIndicator && 'form--invalid'}`}>

        <textarea
            id={'feedback-textarea'}
            spellCheck={false}
            value={text}
            placeholder={'blabla'}
            onChange={handleTextareaChange} />

        <label htmlFor="feedback-textarea">Enter your feedback here, remember to #hashtag the company</label>

        <div>
            <p className={'u-italic'}>{charCount}</p>
            <button><span>Submit</span></button>
        </div>
    </form>
}
