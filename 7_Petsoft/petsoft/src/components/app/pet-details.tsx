"use client";

import Image from "next/image";
import {usePetContext} from "@/lib/hooks";
import PetButton from "@/components/app/pet-button";
import { Pet } from "@prisma/client";

export default function PetDetails() {
    const {selectedPet} = usePetContext();

    return <section className={'h-full w-full flex flex-col'}>

        {!selectedPet ? <EmptyPetDetails /> :
        <>
            <TopBar selectedPet={selectedPet} />


            <OtherInfos selectedPet={selectedPet} />

            <Notes selectedPet={selectedPet} />
        </>}


    </section>
}

type PetDetailsComponentsProps = {
    selectedPet: Pet
}
function TopBar ({selectedPet} : PetDetailsComponentsProps) {
   const {handleCheckoutPet} = usePetContext();

    return <div className={'flex items-center bg-white px-8 py-5 border-b border-light'}>
        <Image
            src={selectedPet?.imageUrl ?? ""}
            alt={"selected pet image"}
            height={75}
            width={75}
            className={'h-[75px] w-[75px] rounded-full object-cover'}/>

        <h2 className={'text-3xl font-semibold leading-7 ml-5'}>{selectedPet.name}</h2>

        <div className={"ml-auto space-x-2"}>
            <PetButton actionType={'edit'}>Edit</PetButton>
            <PetButton onClick={() => handleCheckoutPet(selectedPet.id)} actionType={"checkout"}>Checkout</PetButton>
        </div>
    </div>
}

function OtherInfos ({selectedPet} : PetDetailsComponentsProps) {
    return <div className={'flex justify-around py-10 px-5 text-center'}>
        <div>
            <h3 className={'text-[13px] font-medium uppercase text-zinc-700'}>Owner name</h3>
            <p className={'mt-1 text-lg text-zinc-800'}>{selectedPet.ownerName}</p>
        </div>
        <div>
            <h3 className={'text-[13px] font-medium uppercase text-zinc-700'}>Age</h3>
            <p className={'mt-1 text-lg text-zinc-800'}>{selectedPet.age}</p>
        </div>

    </div>
}

function Notes ({selectedPet} : PetDetailsComponentsProps) {
    return <section className={'flex-1 bg-white px-7 py-5 rounded-md mb-9 mx-8 border border-light'}>
        {selectedPet.notes}
    </section>
}

function EmptyPetDetails() {
    return <section className={'h-full flex items-center justify-center'}>
        <p className={'text-2xl font-medium'}>Select a pet to view details</p>
    </section>
}