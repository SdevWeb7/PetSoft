import Image from "next/image";
import H1 from "@/components/h1";
import {PropsWithChildren} from "react";
import {capitalize} from "@/lib/utils";
import {Metadata} from "next";
import {getEvent} from "@/lib/server-utils";


type EventPageProps = {
    params: {
        slug: string;
    }
}

export async function generateMetadata({params}: EventPageProps) : Promise<Metadata> {
    const slug = params.slug;
    const event = await getEvent(slug);

    return {
        title: `Evento - ${capitalize(event.name)}`,
        description: `Event ${capitalize(event.name)}`
    };
}
// export function generateStaticParams() {
//     return [
//         { slug: 'comedy-extravaganza' },
//         { slug: 'dj-practice-session' }
//     ]
// }
export default async function Event({params}: EventPageProps) {
    const slug = params.slug;
    const event = await getEvent(slug);


  return (
    <main>
        <section className={'flex justify-center items-center relative overflow-hidden py-14 md:py-20'}>
            <Image
                src={event.imageUrl} alt={'Event background image'}
                className={'object-cover blur-3xl z-0'}
                fill
                quality={50}
                sizes={'(max-width: 1280px) 100vw, 1280px'}
                priority />


            <div className={'z-1 flex flex-col lg:flex-row gap-6 lg:gap-16 relative'}>
                <Image
                    src={event.imageUrl}
                    alt={event.name}
                    className={'rounded-xl border-2 border-white/50 object-cover'}
                    width={300}
                    height={201} />

                <div className={'flex flex-col'}>
                    <p className={'text-white/75'}>{new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</p>

                    <H1 className={'mb-2 mt-1 whitespace-nowrap lg:text-5xl'}>{event.name}</H1>

                    <p className={'whitespace-nowrap text-xl text-white/75'}>Organized by <span className={'italic'}>{event.organizerName}</span></p>

                    <button className={'bg-white/20 text-lg capitalize bg-blur mt-5 lg:mt-auto w-[95vw] sm:w-full py-2 rounded-md border-white/10 border-2 state-effects'}>Get tickets</button>
                </div>
            </div>
        </section>

        <div className={'min-h-[75vh] text-center px-5 py-16'}>
            <Section>
                <SectionHeading>About this event</SectionHeading>
                <SectionContent>{event.description}</SectionContent>
            </Section>

            <Section>
                <SectionHeading>Location</SectionHeading>
                <SectionContent>{event.location}</SectionContent>
            </Section>
        </div>

    </main>
  )
}


function Section ({children} : PropsWithChildren) {
    return <section className={'mb-16'}>{children}</section>
}

function SectionHeading({children} : PropsWithChildren) {
    return <h2 className={'text-2xl mb-8'}>{children}</h2>
}

function SectionContent({children} : PropsWithChildren) {
    return <p className={'max-w-4xl mx-auto text-lg leading-8 text-white/75'}>{children}</p>
}