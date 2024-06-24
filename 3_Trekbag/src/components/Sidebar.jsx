import AddItemForm from "./AddItemForm.jsx";
import ButtonsGroup from "./ButtonsGroup.jsx";
import { useItemsStore } from "../stores/itemsStore.js";


export default function Sidebar () {
   const addItem = useItemsStore(state => state.addItem);

   return <div className={'sidebar'}>

      <AddItemForm onAddItem={addItem} />

      <ButtonsGroup />
   </div>;
}
