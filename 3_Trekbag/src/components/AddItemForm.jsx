import Button from "./Button.jsx";
import { useRef, useState } from "react";

export default function AddItemForm ({onAddItem}) {
   const [text, setText] = useState('');
   const inputRef = useRef(null);

   const handleSubmit = (e) => {
      e.preventDefault();
      if (text) {
         onAddItem(text);
         inputRef.current.focus();
         setText('');
      }
   }

   return <form onSubmit={handleSubmit}>
       <h2>Add an item</h2>

       <input
          type="text"
          ref={inputRef}
          value={text}
          onChange={e => setText(e.target.value)}
          autoFocus />

      <Button>Add to list</Button>
   </form>
}
