import Button from "./Button.jsx";
import { useItemsStore } from "../stores/itemsStore.js";


export default function ButtonsGroup () {

   const markAllAsCompleted = useItemsStore(state => state.markAllAsCompleted);
   const markAllAsIncompleted = useItemsStore(state => state.markAllAsIncompleted);
   const resetToInitial = useItemsStore(state => state.resetToInitial);
   const removeAllItems = useItemsStore(state => state.removeAllItems);


   const secondaryButtons = [
      {text: 'Mark all as complete', onClick: markAllAsCompleted},
      {text: 'Mark all as incomplete', onClick: markAllAsIncompleted},
      {text: 'Reset to initial', onClick: resetToInitial},
      {text: 'Remove all items', onClick: removeAllItems}
   ];
   return <section className={'button-group'}>

      {secondaryButtons.map(({text, onClick}, index) => <Button
                                                            key={index}
                                                            buttonType={'secondary'}
                                                            onClick={onClick}>{text}</Button>)}
   </section>
}
