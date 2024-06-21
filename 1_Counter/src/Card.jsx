import Title from "./Title.jsx";
import Count from "./Count.jsx";
import ResetButton from "./ResetButton.jsx";
import ButtonsContainer from "./ButtonsContainer.jsx";
import { useEffect, useState } from "react";
import CountButton from "./CountButton.jsx";

export const Card = () => {
   const [count, setCount] = useState(0);
   const limit = 5;
   const locked = count === limit ? true : false;

   useEffect(() => {
      const handleKeyDown = (e) => {
         if (e.code === 'Space' && !locked && count < limit) {
            setCount(count + 1);
         }
      }
      window.addEventListener('keydown', handleKeyDown);

      return () => {
         window.removeEventListener('keydown', handleKeyDown);
      }

   }, [count]);

   return (<div className={`card ${locked && 'card--limit'}`}>

      <Title locked={locked} />

      <Count count={count} />

      <ResetButton setCount={setCount} />

      <ButtonsContainer>
         <CountButton setCount={setCount} type={'minus'} limit={limit} locked={locked} />
         <CountButton setCount={setCount} type={'plus'} limit={limit} locked={locked} />
      </ButtonsContainer>

   </div>)
}

export default Card;