import Textarea from "./Textarea.jsx";
import Stats from "./Stats.jsx";
import { useState } from "react";

export default function Container () {
   const [text, setText] = useState("");

   return <>

       <main className={"container"}>
            <Textarea text={text} setText={setText} />

            <Stats text={text} />
       </main>
   </>
}
