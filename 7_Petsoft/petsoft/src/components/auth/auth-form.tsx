"use client";

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {logIn, signUp} from "@/actions/auth-actions";
import React from "react";
import AuthFormBtn from "@/components/auth/auth-form-btn";
import {useFormState} from "react-dom";

type AuthFormProps = {
    type: 'login' | 'sign-up'
}
export default function AuthForm({type} : AuthFormProps) {
    const [signUpError, dispatchSignUp] = useFormState(signUp, undefined);
    const [logInError, dispatchLogin] = useFormState(logIn, undefined);

    return <form action={type === "login" ? dispatchLogin : dispatchSignUp}>

        <div className={'space-y-1'}>
            <Label htmlFor={'email'}>Email</Label>
            <Input id={'email'} type={'email'} name={"email"} required maxLength={100} />
        </div>


        <div className={"mb-4 mt-4 space-y-1"}>
            <Label htmlFor={'password'}>Password</Label>
            <Input id={'password'} type={'password'} name={"password"} required maxLength={100} minLength={8} />
        </div>

        <AuthFormBtn type={type} />

        {signUpError && <p className={'text-red-500 text-sm mt-2'}>{signUpError.message}</p>}
        {logInError && <p className={'text-red-500 text-sm mt-2'}>{logInError.message}</p>}
    </form>
}
