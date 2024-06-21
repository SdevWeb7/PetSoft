export default function Stat ({label, number}) {

   return <>

       <section className={'stat'}>

           <span className={`stat__number ${number < 0 && 'stat__number--limit'}`}>{number}</span>

           <h2 className={'second-heading'}>{label}</h2>
       </section>

   </>
}
