"use client";

import Image from "next/image";
import {usePetContext, useSearchQuery} from "@/lib/hooks";
import {cn} from "@/lib/utils";

export default function PetList() {
    const {optimisticPets, handleSelectedId, selectedPetId} = usePetContext();
    const {searchQuery} = useSearchQuery();

    const filteredPets = optimisticPets.filter(pet => pet.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return <ul className={'bg-white broder-b border-light'}>

        {filteredPets.map(pet => (
                <li key={pet.id}>
                    <button
                        onClick={() => handleSelectedId(pet.id)}
                        className={cn('h-[70px] w-full flex items-center cursor-pointer px-5 text-base gap-3 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition', {
                            'bg-[#EFF1F2]': pet.id === selectedPetId
                        })}>
                        <Image
                            className={'rounded-full object-cover w-[45px] h-[45px]'}
                            src={pet.imageUrl}
                            alt={'Image pet'}
                            width={45}
                            height={45}/>

                        <p className={'font-semibold'}>{pet.name}</p>
                    </button>
                </li>
            ))}
            </ul>;
        }
