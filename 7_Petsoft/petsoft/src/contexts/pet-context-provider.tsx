"use client";

import {createContext, PropsWithChildren, useOptimistic, useState} from "react";
import {Pet} from "@prisma/client";
import { addPet, checkoutPet, editPet } from "@/actions/actions";
import { toast } from "sonner";
import { PetEssentials } from "@/lib/types";

type PetContextType = {
    optimisticPets: Pet[];
    selectedPetId: Pet["id"] | null;
    handleSelectedId: (id: Pet["id"]) => void;
    selectedPet: Pet | undefined;
    numberOfPets: number;
    handleAddPet: (newPet: PetEssentials) => Promise<void>;
    handleEditPet: (id: Pet["id"], newPet: PetEssentials) => Promise<void>;
    handleCheckoutPet: (id: Pet["id"]) => Promise<void>;
}
export const PetContext = createContext<PetContextType | null>(null);

type PetContextProviderProps = PropsWithChildren<{
    data: Pet[];
}>;
export default function PetContextProvider({children, data} : PetContextProviderProps) {
    const [optimisticPets, setOptimisticPets] = useOptimistic(data, (state, {action, payload}) => {
        switch (action) {
            case "add":
                return [...state, {
                    id: Date.now().toString(),
                    ...payload
                }];
            case "edit":
                return state.map(pet => pet.id === payload.id ? {...pet, ...payload.newPet} : pet);
            case "delete":
                return state.filter(pet => pet.id !== payload);
            default:
                return state;
        }
    });
    const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
    const selectedPet = optimisticPets.find(pet => pet.id === selectedPetId);
    const numberOfPets = optimisticPets.length;

    const handleSelectedId = (id: string) => {
        setSelectedPetId(id);
    }
    const handleAddPet = async (newPet: PetEssentials) => {
        setOptimisticPets({ action : "add", payload: newPet});
        const error = await addPet(newPet);
        if (error) {
            toast.error(error.message);
            return;
        }
    }
    const handleEditPet = async (petId: Pet["id"], newPet: PetEssentials) => {
         setOptimisticPets({ action: "edit", payload: { id: petId, newPet }});
         const error = await editPet(petId, newPet);
         if (error) {
               toast.error(error.message);
               return;
         }
      }

      const handleCheckoutPet = async (id: Pet["id"]) => {
          setOptimisticPets({ action: "delete", payload: id });
            const error = await checkoutPet(id);
            if (error) {
                toast.error(error.message);
                return;
            }
            setSelectedPetId(null);
      }

    return <PetContext.Provider value={{
            optimisticPets,
            selectedPetId,
            handleSelectedId,
            selectedPet,
            numberOfPets,
            handleAddPet,
            handleEditPet,
            handleCheckoutPet
        }}>
        {children}
    </PetContext.Provider>
}
