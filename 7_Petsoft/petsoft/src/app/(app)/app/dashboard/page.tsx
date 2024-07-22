import Stats from "@/components/app/stats";
import Branding from "@/components/app/branding";
import SearchForm from "@/components/app/search-form";
import ContentBlock from "@/components/app/content-block";
import PetList from "@/components/app/pet-list";
import PetDetails from "@/components/app/pet-details";
import PetButton from "@/components/app/pet-button";
import {PlusIcon} from "@radix-ui/react-icons";

export default async function Page() {


    return <main>
        <div className={'flex items-center justify-between text-white py-8'}>

            <Branding/>


            <Stats/>
        </div>

        <div className={'grid md:grid-cols-3 grid-rows-[45px_300px_500px] md:grid-rows-[45px_1fr] gap-4 md:h-[600px]'}>
            <div className={'md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1'}>
                <SearchForm/>
            </div>

            <div className={'md:row-start-2 md:row-span-full md:col-start-1 md:col-span-1 relative'}>
                <ContentBlock>
                    <PetList />

                    <div className={"absolute bottom-4 right-4"}>
                        <PetButton actionType={"add"}><PlusIcon className={"w-6 h-6"} /></PetButton>
                    </div>
                </ContentBlock>
            </div>

            <div className={'md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full'}>
                <ContentBlock>
                    <PetDetails/>
                </ContentBlock>
            </div>

        </div>
    </main>
}
