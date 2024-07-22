"use client";

import {Button} from "@/components/ui/button";
import {PropsWithChildren, useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import PetForm from "@/components/app/pet-form";
import { flushSync } from "react-dom";

type PetButtonProps = PropsWithChildren<{
    actionType: "add" | "edit" | "checkout";
    onClick?: () => void;
    disabled?: boolean;
}>
export default function PetButton({actionType, children, onClick, disabled} : PetButtonProps) {
    const [isFormOpen, setIsFormOpen] = useState(false);

    if (actionType === "checkout") {
        return <Button variant='secondary' onClick={onClick} disabled={disabled}>
            {disabled ? 'Sending...' : children}
        </Button>
    }

    return <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogTrigger asChild>
            {actionType === "add" ? <Button size="icon">{children}</Button> : <Button variant='secondary'>{children}</Button>}
        </DialogTrigger>

        <DialogContent>
            <DialogHeader>
                <DialogTitle>{actionType === "add" ? "Add a new pet" : "Edit pet"}</DialogTitle>
            </DialogHeader>
            <PetForm actionType={actionType} onFormSubmission={() => {
               flushSync(() => setIsFormOpen(false));
            }} />
        </DialogContent>
    </Dialog>;


}
