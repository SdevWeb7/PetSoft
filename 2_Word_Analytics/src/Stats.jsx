import Stat from "./Stat.jsx";

export default function Stats ({text}) {

   const numberOfWords = text.split(/\s/).filter(w => w !== "").length;

   return <>

       <section className={'stats'}>

          <Stat label={'Characters'} number={text.length} />

          <Stat label={'Words'} number={numberOfWords} />

          <Stat label={'Instagram'} number={280 - text.length} />

          <Stat label={'Facebook'} number={2200 - text.length} />


       </section>

   </>
}
