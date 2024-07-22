import H1 from "@/components/h1";
import ContentBlock from "@/components/app/content-block";
import {auth} from "@/lib/auth-no-edge";
import {redirect} from "next/navigation";
import SignOutBtn from "@/components/auth/sign-out-btn";

export default async function Page() {
    const session = await auth();

    if (!session?.user) {
        redirect('/login');
    }
    return <main>

        <H1 className={'my-8 text-white'}>Account</H1>


        <ContentBlock className={"h-[500px] flex flex-col justify-center items-center"}>
            <p className={'mb-4'}>Logged in as {session.user.email}</p>

            <SignOutBtn />
        </ContentBlock>
    </main>
}
