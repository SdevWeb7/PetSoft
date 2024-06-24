import EmptyView from "./EmptyView.jsx";
import Select from "react-select";
import { useMemo, useState } from "react";
import { useItemsStore } from "../stores/itemsStore.js";

const sortingOptions = [
   { value: "default", label: "Sort by default" },
   { value: "packed", label: "Sort by packed" },
   { value: "unpacked", label: "Sort by unpacked" },
];

export default function ItemList () {
   const items = useItemsStore(state => state.items);
   const toggleItem = useItemsStore(state => state.toggleItem);
   const deleteItem = useItemsStore(state => state.deleteItem);
   const [sortBy, setSortBy] = useState('default');


   const sortedItems = useMemo(() => [...items].sort((a, b) => {
      if (sortBy === 'packed') {
         return b.packed - a.packed;
      }
      if (sortBy === 'unpacked') {
         return a.packed - b.packed;
      }
      return;
   }), [items, sortBy]);



   return <ul className={"item-list"}>

      {items.length === 0 && <EmptyView />}

      {items.length > 0 && <section className="sorting">
         <Select
            defaultValue={sortingOptions[0]}
            options={sortingOptions}
            onChange={option => setSortBy(option.value)} />

      </section>}

      {sortedItems.map((item) => <Item
                              key={Date.now() + Math.random()}
                              item={item}
                              onToggleItem={toggleItem}
                              onRemoveItem={deleteItem} />)}
   </ul>;
}


function Item({item, onRemoveItem, onToggleItem}) {

   return <li className={'item'}>

      <label>
         <input
            type="checkbox"
            checked={item.packed}
            onChange={() => onToggleItem(item.id)} />

         {item.name}
      </label>


      <button onClick={() => onRemoveItem(item.id)}>❌</button>


   </li>;
}