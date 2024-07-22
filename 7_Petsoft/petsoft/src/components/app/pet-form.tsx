"use client";

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {usePetContext} from "@/lib/hooks";
import {Button} from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { PetEssentials } from "@/lib/types";
import {zodResolver} from "@hookform/resolvers/zod";
import {DEFAULT_PET_IMAGE} from "@/lib/constants";
import {petFormSchema} from "@/lib/zod-schemas";

type PetFormProps = {
    actionType: "add" | "edit";
    onFormSubmission: () => void;
}
export default function PetForm({actionType, onFormSubmission} : PetFormProps) {
    const {selectedPet, handleAddPet, handleEditPet} = usePetContext();
    const {register, formState: {errors}, trigger, getValues} = useForm<PetEssentials>({
        mode: 'onBlur',
        resolver: zodResolver(petFormSchema),
        defaultValues: actionType === "edit" ? selectedPet : {}
    });

    const handleSubmit = async () => {
         const result = await trigger();
         if (!result) return;

         onFormSubmission();
         const petData = getValues();
         petData.imageUrl = petData.imageUrl || DEFAULT_PET_IMAGE;

         if (actionType === "add") await handleAddPet(petData);

         else if (actionType === "edit") await handleEditPet(selectedPet!.id, petData);
      }


    return <form action={handleSubmit} className={'flex flex-col'}>

        <div className={"space-y-3"}>
            <div className={'space-y-1'}>
                <Label htmlFor={'name'}>Name</Label>
                <Input
                    id={'name'}
                    {...register('name')} />
                    {errors.name && <span className={'text-red-500'}>{errors.name.message}</span>}
            </div>


            <div className={'space-y-1'}>
                <Label htmlFor={'ownerName'}>Owner</Label>
                <Input
                    id={'ownerName'}
                    {...register('ownerName')} />
                    {errors.ownerName && <span className={'text-red-500'}>{errors.ownerName.message}</span>}
            </div>


            <div className={'space-y-1'}>
                <Label htmlFor={'age'}>Age</Label>
                <Input
                    id={'age'}
                    {...register('age')} />
                  {errors.age && <span className={'text-red-500'}>{errors.age.message}</span>}
            </div>

            <div className={'space-y-1'}>
                <Label htmlFor={'imageUrl'}>Image</Label>
                <Input
                    id={'imageUrl'}
                    {...register('imageUrl')} />
                    {errors.imageUrl && <span className={'text-red-500'}>{errors.imageUrl.message}</span>}
            </div>


            <div className={'space-y-1'}>
                <Label htmlFor={'notes'}>Notes</Label>
                <Textarea
                    id={'notes'}
                    {...register('notes')} />
                  {errors.notes && <span className={'text-red-500'}>{errors.notes.message}</span>}
            </div>
        </div>

        <Button type={'submit'} className={'mt-5 self-end'}>
            {actionType === "add" ? "Add a new pet" : "Edit pet"}
        </Button>
    </form>
}
