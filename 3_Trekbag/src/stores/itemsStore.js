import { create } from "zustand";
import { initialItems } from "../lib/constants.js";

export const useItemsStore = create((set) => ({
   items: initialItems,
   removeAllItems: () => set(() => ({ items: [] })),
   resetToInitial: () => set(() => ({ items: initialItems })),
   markAllAsCompleted: () => set(state => ({ items: state.items.map(item => ({ ...item, packed: true })) })),
   markAllAsIncompleted: () => set(state => ({ items: state.items.map(item => ({ ...item, packed: false })) })),
   addItem: (newItemText) => set(state => ({ items: [...state.items, {id: state.items.length+1, name: newItemText, packed: false}] })),
   toggleItem: (id) => set(state => ({ items: state.items.map(item => item.id === id ? { ...item, packed: !item.packed } : item) })),
   deleteItem: (id) => set(state => ({ items: state.items.filter(item => item.id !== id) }))
}));