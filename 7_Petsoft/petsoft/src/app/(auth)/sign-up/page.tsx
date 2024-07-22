import H1 from "@/components/h1";
import AuthForm from "@/components/auth/auth-form";
import Link from "next/link";

export default function Page() {

    return <div>

        <H1 className={'text-center mb-5'}>Sign Up</H1>

        <AuthForm type={"sign-up"}/>

        <p className={'mt-6 text-sm text-zinc-500'}>Already have an account? <Link href={'/login'} className={'font-medium'}>Log in</Link></p>
    </div>
}
