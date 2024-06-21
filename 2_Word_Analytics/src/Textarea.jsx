import { useState } from "react";
import Warning from "./Warning.jsx";

export default function Textarea ({text, setText}) {
   const [warning, setWarning] = useState('');

   const handleChange = (event) => {
      const newText = event.target.value;

      if (newText.includes('<')) {
         setText(newText.replace('<', ''));
         setWarning('No tags allowed');
      } else if (newText.includes('@')) {
         setText(newText.replace('@', ''));
         setWarning('No @ allowed');
      } else {
         setText(newText);
         setWarning('');
      }
   }


   return <div className={'textarea'}>

       <textarea
          value={text}
          onChange={handleChange}
          placeholder={"Enter some text here"}
          spellCheck={false} />

      {warning && <Warning warning={warning} />}
   </div>
}
