import H1 from "@/components/h1";
import EventList from "@/components/events/event-list";
import {Suspense} from "react";
import Loading from "@/app/events/[city]/loading";
import {capitalize} from "@/lib/utils";
import {Metadata} from "next";
import {z} from "zod";


type MetadataProps = {
    params: {
        city: string;
    },
};
export function generateMetadata({params}: MetadataProps) : Metadata {
    const city = params.city;
    const title = city === "all" ? "All Events" : `Events in ${capitalize(city)}`;

    return {
        title: `Evento - ${title}`,
        description: city === "all" ? "All events" : `Events in ${capitalize(city)}`
    };
}

type EventsPageParams = MetadataProps & {
    searchParams: {
        [key: string]: string | string[] | undefined;
    }
}
const pageNumberSchema = z.coerce.number().int().positive().optional();
export default async function EventsPage({params, searchParams} : EventsPageParams) {
    const city = params.city;
    const parsedPage = pageNumberSchema.safeParse(searchParams.page);
    if (!parsedPage.success) {
        throw new Error("Invalid page number");
    }

    return (
      <main className="flex flex-col items-center py-24 px-[20px] min-h-[110vh]">

          <H1 className={'mb-16'}>
              {city === "all" && "All Events"}
              {city !== "all" && `Events in ${capitalize(city)}`}
          </H1>

          <Suspense key={city+parsedPage.data} fallback={<Loading />}>
            <EventList city={city} page={parsedPage.data} />
          </Suspense>

      </main>
    );
}
