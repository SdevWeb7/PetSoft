import {Dispatch, SetStateAction} from "react";

type HashtagItemProps = {
    company: string;
    onSelectCompany: Dispatch<SetStateAction<string>>;
};

export default function HashtagItem({companyName, onSelectCompany}: HashtagItemProps) {

    return <li>
        <button onClick={() => onSelectCompany(companyName)}>#{companyName}</button>
    </li>;
}
