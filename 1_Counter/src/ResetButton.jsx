import { ResetIcon } from "@radix-ui/react-icons";

export const ResetButton = ({setCount}) => {

   const handleClick = (event) => {
      setCount(0);
      event.currentTarget.blur();
   }

   return (
      <button
         onClick={handleClick}
         className={"reset-btn"}>
         <ResetIcon className={'reset-btn-icon'} />
      </button>
   )
}

export default ResetButton;
