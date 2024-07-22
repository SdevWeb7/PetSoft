"use client";

import {Button} from "@/components/ui/button";
import {useFormStatus} from "react-dom";

type AuthFormBtnProps = {
    type: 'login' | 'sign-up';
}
export default function AuthFormBtn({type} : AuthFormBtnProps) {
    const { pending } = useFormStatus();

    return <Button disabled={pending} type={'submit'}>{type === "login" ? "Log In" : "Sign Up"}</Button>
}
