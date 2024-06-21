import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

export const CountButton = ({setCount, type, limit, locked}) => {

    const handleClick = (event) => {
         setCount((prevCount) => {
             if (type === 'minus') {
                 return prevCount === 0 ? 0 : prevCount - 1;
             } else {
                 return prevCount < limit ? prevCount + 1 : prevCount;
             }
         });
         event.currentTarget.blur();
    }


    return (
       <button
          disabled={locked}
             onClick={handleClick}
             className={'count-btn'}>

           {type === 'minus' ? <MinusIcon className={'count-btn-icon'} /> :
                 <PlusIcon className={'count-btn-icon'} />}
       </button>
   )
}

export default CountButton;