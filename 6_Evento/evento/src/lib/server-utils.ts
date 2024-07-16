import 'server-only';

import {EventoEvent} from "@prisma/client";
import {unstable_cache} from "next/cache";
import prisma from "@/lib/db";
import {notFound} from "next/navigation";
import {capitalize} from "@/lib/utils";


type ReturnTypesEventsFetch = {
    events: EventoEvent[];
    totalCount: number;
}
export const getEvents = unstable_cache(async(city: string, page=1): Promise<ReturnTypesEventsFetch> => {
    const events = await prisma.eventoEvent.findMany({
        where: {
            city: city === "all" ? undefined : capitalize(city)
        },
        orderBy: {
            date: "asc"
        },
        take: 6,
        skip: (page - 1) * 6
    });

    const totalCount = await prisma.eventoEvent.count({
        where: {
            city: city === "all" ? undefined : capitalize(city)
        }
    });

    return {events, totalCount};
});

export const getEvent = unstable_cache(async(slug: string) : Promise<EventoEvent> => {
    const event = await prisma.eventoEvent.findUnique({
        where: {
            slug: slug
        }
    });

    if (!event) {
        return notFound();
    }
    return event;
});
